const request = require('supertest')

jest.mock('../../server/db/meals', () => ({
  userMeals: () => Promise.resolve([
    {
      'id': 1,
      'user_id': 1,
      'title': 'spaget',
      'time': '2019-03-01 14:00:45'
    },
    {
      'id': 2,
      'user_id': 1,
      'title': 'bread',
      'time': '2019-03-01 18:00:30'
    },
    {
      'id': 3,
      'user_id': 1,
      'title': 'pizza',
      'time': '2019-03-01 20:00:10'
    }
  ]),
  latestMeal: () => Promise.resolve(
    {
      'id': 3,
      'user_id': 1,
      'title': 'pizza',
      'time': '2019-03-01 20:00:10'
    }
  ),
  allMealMoods: () => Promise.resolve([
    {
      'id': 2,
      'emotion_id': 3,
      'meal_id': 2,
      'note': 'This bread was gross',
      'time': '2019-03-01 18:00:30'
    }
  ]),
  allUserMealsAndMoods: () => Promise.resolve(
    [
      {
        'mealId': 1,
        'moodId': 1,
        'emotionId': 77001,
        'notes': 'I love this spaget!',
        'moodTime': '2019-03-01 14:00:45',
        'mealTime': '2019-03-01 14:00:45',
        'title': 'spaget'
      },
      {
        'mealId': 1,
        'moodId': 4,
        'emotionId': 77001,
        'notes': 'groos spaget',
        'moodTime': '2019-03-01 14:50:45',
        'mealTime': '2019-03-01 14:00:45',
        'title': 'spaget'
      }
    ]
  )
}))

const server = require('../../server/server')
// this token is created for billy with the jwt test secret
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTUxODI3NDEwLCJleHAiOjE1NTE5MTM4MTB9.Nz4TaQv6oLAmv7GqK9u5Wbw0Nk5TmhARYc1XFoLIsHQ'

test('GET /:userId gets all allUserMealsAndMoods', () => {
  return request(server)
    .get('/api/v1/meals/1')
    .set({Authorization: `Bearer ${token}`})
    .expect(200)
    .then((res) => {
      const actual = res.body[0].id
      expect(actual).toBe(1)
    })
    .catch(err => expect(err).toBeNull())
})

test('GET /mostRecent/:userId gets the last meal', () => {
  return request(server)
    .get('/api/v1/meals/mostRecent/1')
    .set({Authorization: `Bearer ${token}`})
    .expect(200)
    .then((res) => {
      const actual = res.body.id
      expect(actual).toBe(3)
    })
    .catch(err => expect(err).toBeNull())
})
