import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { paymentAPI } from '../services/api'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

interface PaymentCheckoutProps {
  amount: number
  description: string
  projectId?: string
  items?: Array<{
    description: string
    quantity: number
    unitPrice: number
  }>
  onSuccess: () => void
  onCancel: () => void
}

const CheckoutFormInner = ({ amount, description, projectId, items, onSuccess, onCancel }: PaymentCheckoutProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    // Create payment intent when component mounts
    const createPayment = async () => {
      try {
        setInitializing(true)
        const response = await paymentAPI.createPayment({
          amount,
          currency: 'EUR',
          projectId,
          description,
          items
        })
        setClientSecret(response.clientSecret)
        setInvoiceNumber(response.invoiceNumber || '')
      } catch (err: unknown) {
        const error = err as { response?: { data?: { error?: string } } }
        setError(error.response?.data?.error || 'Erro ao criar pagamento')
      } finally {
        setInitializing(false)
      }
    }

    createPayment()
  }, [amount, description, projectId, items])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!stripe || !elements) {
      return
    }

    setLoading(true)

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setError('Erro ao processar cartão')
      setLoading(false)
      return
    }

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      })

      if (stripeError) {
        setError(stripeError.message || 'Erro no pagamento')
        setLoading(false)
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess()
      }
    } catch (err: unknown) {
      const error = err as { message?: string }
      setError(error.message || 'Erro ao processar pagamento')
      setLoading(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }

  if (initializing) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">A preparar pagamento...</p>
      </div>
    )
  }

  if (!clientSecret || error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Erro ao criar pagamento. Por favor, tenta novamente.</p>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        <button
          onClick={onCancel}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Voltar
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalhes do Pagamento</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Valor</label>
            <p className="text-2xl font-bold text-gray-900">€{amount.toFixed(2)}</p>
          </div>
          {invoiceNumber && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Número de Fatura</label>
              <p className="text-gray-900">{invoiceNumber}</p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Detalhes do Cartão
        </label>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? '⏳ A processar...' : `Pagar €${amount.toFixed(2)}`}
        </button>
      </div>
    </form>
  )
}

const PaymentCheckout = (props: PaymentCheckoutProps) => {
  const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    // Pre-create payment intent to get clientSecret for Elements
    paymentAPI.createPayment({
      amount: props.amount,
      currency: 'EUR',
      projectId: props.projectId,
      description: props.description,
      items: props.items
    }).then((response) => {
      setClientSecret(response.clientSecret)
    }).catch(() => {
      // Error will be handled in CheckoutFormInner
    })
  }, [props.amount, props.description, props.projectId, props.items])

  if (!stripeKey) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Stripe não está configurado. Adiciona VITE_STRIPE_PUBLISHABLE_KEY ao .env</p>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-gray-600">A preparar pagamento...</p>
      </div>
    )
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutFormInner {...props} />
    </Elements>
  )
}

export default PaymentCheckout

