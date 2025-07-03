const { test, expect, beforeEach, describe } = require('@playwright/test')
const loginWith = require('./helper').loginWith
const createBlog = require('./helper').createBlog

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'admin',
        username: 'admin',
        password: 'root'
      }
    })
    // Add other user
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'user',
        username: 'user',
        password: 'userpass'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // Check if title is show
    await expect(page.getByText('Login in to application')).toBeVisible()
    // Check Inputs
    await expect(page.getByTestId('input username')).toBeVisible()
    await expect(page.getByTestId('input password')).toBeVisible()
  })

  describe('Login', () => {
    test('succedes with correct credentials', async ({ page }) => {
      // Write credentials
      await loginWith(page, 'admin', 'root')
      // Expect
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // Write credentials
      await loginWith(page, 'user', 'pass')
      // Expect
      await expect(page.getByText('Login in to application')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // Write credentials
      await loginWith(page, 'admin','root')
    })

    test('a new blog can be created', async ({ page }) => {
      const timestamp = Date.now()
      const newBlog = {
        title: `Nuevo blog ${timestamp}`,
        author: 'nicolas',
        url: 'www.new.blog.cl'
      }

      await createBlog(page, newBlog)

      // Use filter to ensure a single match
      const blogCard = page.locator('[data-testid="blog card"]').filter({
        hasText: `Nuevo blog ${timestamp} nicolas`
      })

      await expect(blogCard).toBeVisible()
    })


    describe('When new blog is created', () => {
  const uniqueTitle1 = `Nuevo blog ${Date.now()}`
  const uniqueTitle2 = `segundo blog ${Date.now()}`

  beforeEach(async ({ page }) => {
    const newBlog = {
      title: uniqueTitle1,
      author: 'nicolas',
      url: 'www.new.blog.cl'
    }
    await createBlog(page, newBlog)
  })

  test('Can increment like blog', async ({ page }) => {
    const blogCard = page.locator('[data-testid="blog card"]').filter({ hasText: uniqueTitle1 })

    // Show blog details
    await blogCard.getByRole('button', { name: 'show' }).click()

    // Like button and count
    const likeButton = blogCard.getByRole('button', { name: 'like' })
    const likeCount = blogCard.getByTestId('like-count')

    // Expect initial like count to be '0'
    await expect(likeCount).toHaveText('0')

    // Click like and expect like count to be '1'
    await likeButton.click()
    await expect(likeCount).toHaveText('1')

    // Click again and expect like count to be '2'
    await likeButton.click()
    await expect(likeCount).toHaveText('2')
  })



  test('Can delete own blog', async ({ page }) => {
    const uniqueTitle = `Nuevo blog ${Date.now()}`
    await createBlog(page, {
      title: uniqueTitle,
      author: 'nicolas',
      url: 'www.new.blog.cl',
    })

    const blogCard = page.locator('[data-testid="blog card"]').filter({ hasText: uniqueTitle })
    await blogCard.getByRole('button', { name: 'show' }).click()

    // Accept confirmation
    page.on('dialog', dialog => dialog.accept())

    await expect(blogCard.getByRole('button', { name: 'Delete' })).toBeVisible()
    await blogCard.getByRole('button', { name: 'Delete' }).click()

    // Wait until the blogCard is gone
    await expect(blogCard).toHaveCount(0, { timeout: 7000 })  // added buffer
  })


  test('Cannot delete blog of other user', async ({ page }) => {
    const uniqueTitle = `Nuevo blog ${Date.now()}`

    // Create blog as user 'admin'
    await createBlog(page, {
      title: uniqueTitle,
      author: 'nicolas',
      url: 'www.new.blog.cl',
    })

    const blogCard = page.locator('[data-testid="blog card"]').filter({ hasText: uniqueTitle })

    // Logout as the original user
    await page.getByRole('button', { name: 'Logout' }).click()

    // Login as different user
    await loginWith(page, 'aks', 'aks')

    // Expand the blog and assert delete button is not visible
    await blogCard.getByRole('button', { name: 'show' }).click()
    await expect(blogCard.getByRole('button', { name: 'Delete' })).toHaveCount(0)
  })



  test('Check that liked blog appears first', async ({ page }) => {
      const uniqueTitle1 = "First class tests"
      const uniqueTitle2 = 'Canonical string reduction'

      // // Create blogs
      // await createBlog(page, {
      //   title: uniqueTitle1,
      //   author: 'nicolas',
      //   url: 'www.new.blog.cl'
      // })

      // await createBlog(page, {
      //   title: uniqueTitle2,
      //   author: 'nicolas',
      //   url: 'www.new.blog.cl'
      // })

      const blog1 = page.locator('[data-testid="blog card"]').filter({ hasText: uniqueTitle1 }).first()
      const blog2 = page.locator('[data-testid="blog card"]').filter({ hasText: uniqueTitle2 }).first()

      // Like the second blog
      await blog2.getByRole('button', { name: 'show' }).click()
      await blog2.getByRole('button', { name: 'like' }).click()

      // Wait for like count to update
      await expect(blog2.locator('[data-testid="like-count"]')).toHaveText('13')

      // Now get the blog cards again and check order
      const blogs = page.locator('[data-testid="blog card"]')
      const firstBlog = blogs.first()

      await expect(firstBlog).toContainText(uniqueTitle2) // Liked blog should appear first
    })

  })


  })
})