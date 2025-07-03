const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { test, describe } = require('node:test')
const testHelper = require('./test_helper')

const listWithOneBlog = testHelper.oneBlog
const listWithMultipleBlogs = testHelper.listBlogs

test('dummy returns one', async () => {
  const response = await fetch('http://localhost:3003/api/blogs');
  const blogsData = await response.json();
  const blogs = blogsData;

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that blog', () => {
    const blogs = [
      {
        title: 'Blog One',
        author: 'Author A',
        url: 'http://example.com',
        likes: 5
      }
    ]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        title: 'Blog One',
        author: 'Author A',
        url: 'http://example.com',
        likes: 5
      },
      {
        title: 'Blog Two',
        author: 'Author B',
        url: 'http://example.com',
        likes: 8
      },
      {
        title: 'Blog Three',
        author: 'Author C',
        url: 'http://example.com',
        likes: 12
      }
    ]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 25)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, it is the favorite', () => {
    const blogs = [
      {
        title: 'Solo Blog',
        author: 'Author Solo',
        url: 'http://example.com',
        likes: 10
      }
    ]
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[0])
  })

  test('of a bigger list is the one with most likes', () => {
    const blogs = [
      {
        title: 'Blog One',
        author: 'Author A',
        url: 'http://example.com/1',
        likes: 5
      },
      {
        title: 'Blog Two',
        author: 'Author B',
        url: 'http://example.com/2',
        likes: 15
      },
      {
        title: 'Blog Three',
        author: 'Author C',
        url: 'http://example.com/3',
        likes: 12
      }
    ]

    const expected = {
      title: 'Blog Two',
      author: 'Author B',
      url: 'http://example.com/2',
      likes: 15
    }

    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, expected)
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    const blogs = []
    const result = listHelper.mostBlogs(blogs)
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, return that author with count 1', () => {
    const blogs = [
      {
        title: 'Solo Blog',
        author: 'Author Solo',
        url: 'http://example.com',
        likes: 3
      }
    ]

    const expected = {
      author: 'Author Solo',
      blogs: 1
    }

    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, expected)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: 'Blog A', author: 'Alice', likes: 2 },
      { title: 'Blog B', author: 'Bob', likes: 3 },
      { title: 'Blog C', author: 'Alice', likes: 5 },
      { title: 'Blog D', author: 'Charlie', likes: 1 },
      { title: 'Blog E', author: 'Alice', likes: 4 },
      { title: 'Blog F', author: 'Bob', likes: 6 }
    ]

    const expected = {
      author: 'Alice',
      blogs: 3
    }

    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, expected)
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    const blogs = []
    const result = listHelper.mostLikes(blogs)
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, return that author with its likes', () => {
    const blogs = [
      {
        title: 'Single Blog',
        author: 'Author One',
        likes: 7
      }
    ]

    const expected = {
      author: 'Author One',
      likes: 7
    }

    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, expected)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: 'Blog A', author: 'Alice', likes: 5 },
      { title: 'Blog B', author: 'Bob', likes: 10 },
      { title: 'Blog C', author: 'Alice', likes: 3 },
      { title: 'Blog D', author: 'Bob', likes: 2 },
      { title: 'Blog E', author: 'Charlie', likes: 15 },
      { title: 'Blog F', author: 'Alice', likes: 7 }
    ]

    const expected = {
      author: 'Alice',
      likes: 15
    }

    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, expected)
  })
})

describe('Search id by title', () => {
  test('When blog exist', () =>{
    const result = listHelper.searchIdByTitle(listWithMultipleBlogs, listWithMultipleBlogs[0].title)
    assert.strictEqual(result, listWithMultipleBlogs[0].id)
  })
})

