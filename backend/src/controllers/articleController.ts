import { Request, Response } from 'express'
import Article from '../models/Article'
import User from '../models/User'

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Helper function to calculate read time
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

// Public routes
export async function getPublishedArticles(req: Request, res: Response) {
  try {
    const { page = 1, limit = 12, category, tag, search } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const filter: any = { published: true }
    
    if (category) filter.category = category
    if (tag) filter.tags = tag
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ]
    }

    const [articles, total] = await Promise.all([
      Article.find(filter)
        .populate('author', 'name email')
        .select('-content')
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Article.countDocuments(filter)
    ])
    
    // Ensure publishedAt exists for sorting
    articles.forEach(article => {
      if (!article.publishedAt && article.createdAt) {
        article.publishedAt = article.createdAt
      }
    })

    res.json({
      success: true,
      articles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error: any) {
    console.error('Get published articles error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getArticleBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params

    const article = await Article.findOne({ slug, published: true })
      .populate('author', 'name email')

    if (!article) {
      return res.status(404).json({ error: 'Article not found' })
    }

    // Increment views
    article.views = (article.views || 0) + 1
    await article.save()

    res.json({
      success: true,
      article
    })
  } catch (error: any) {
    console.error('Get article by slug error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getFeaturedArticles(req: Request, res: Response) {
  try {
    const articles = await Article.find({ published: true, featured: true })
      .populate('author', 'name email')
      .select('-content')
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(5)
      .lean()

    // Ensure publishedAt exists
    articles.forEach((article: any) => {
      if (!article.publishedAt && article.createdAt) {
        article.publishedAt = article.createdAt
      }
    })

    res.json({
      success: true,
      articles
    })
  } catch (error: any) {
    console.error('Get featured articles error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Admin routes
export async function getAllArticles(req: Request, res: Response) {
  try {
    const { page = 1, limit = 20, published, category } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const filter: any = {}
    if (published !== undefined) filter.published = published === 'true'
    if (category) filter.category = category

    const [articles, total] = await Promise.all([
      Article.find(filter)
        .populate('author', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Article.countDocuments(filter)
    ])

    res.json({
      success: true,
      articles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error: any) {
    console.error('Get all articles error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getArticleById(req: Request, res: Response) {
  try {
    const { id } = req.params

    const article = await Article.findById(id)
      .populate('author', 'name email')

    if (!article) {
      return res.status(404).json({ error: 'Article not found' })
    }

    res.json({
      success: true,
      article
    })
  } catch (error: any) {
    console.error('Get article by id error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function createArticle(req: Request, res: Response) {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { title, excerpt, content, category, tags, featured, published, coverImage } = req.body

    // Validation
    if (!title || !excerpt || !content || !category) {
      return res.status(400).json({
        error: 'Missing required fields: title, excerpt, content, category'
      })
    }

    // Generate slug
    const baseSlug = generateSlug(title)
    let slug = baseSlug
    let counter = 1

    // Ensure unique slug
    while (await Article.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Calculate read time
    const readTime = calculateReadTime(content)

    // Create article
    const article = await Article.create({
      title,
      slug,
      excerpt,
      content,
      author: userId,
      category,
      tags: tags || [],
      featured: featured || false,
      published: published || false,
      publishedAt: published ? new Date() : undefined,
      coverImage,
      readTime
    })

    console.log('✅ Article created:', article._id)

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      article
    })
  } catch (error: any) {
    console.error('Create article error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updateArticle(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { title, excerpt, content, category, tags, featured, published, coverImage } = req.body

    const updates: any = {}
    if (title) updates.title = title
    if (excerpt) updates.excerpt = excerpt
    if (content) {
      updates.content = content
      updates.readTime = calculateReadTime(content)
    }
    if (category) updates.category = category
    if (tags !== undefined) updates.tags = tags
    if (featured !== undefined) updates.featured = featured
    if (published !== undefined) {
      updates.published = published
      if (published && !updates.publishedAt) {
        updates.publishedAt = new Date()
      }
    }
    if (coverImage !== undefined) updates.coverImage = coverImage

    // Regenerate slug if title changed
    if (title) {
      const baseSlug = generateSlug(title)
      let slug = baseSlug
      let counter = 1
      while (await Article.findOne({ slug, _id: { $ne: id } })) {
        slug = `${baseSlug}-${counter}`
        counter++
      }
      updates.slug = slug
    }

    const article = await Article.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('author', 'name email')

    if (!article) {
      return res.status(404).json({ error: 'Article not found' })
    }

    res.json({
      success: true,
      message: 'Article updated successfully',
      article
    })
  } catch (error: any) {
    console.error('Update article error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function deleteArticle(req: Request, res: Response) {
  try {
    const { id } = req.params

    const article = await Article.findByIdAndDelete(id)

    if (!article) {
      return res.status(404).json({ error: 'Article not found' })
    }

    console.log('✅ Article deleted:', id)

    res.json({
      success: true,
      message: 'Article deleted successfully'
    })
  } catch (error: any) {
    console.error('Delete article error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

