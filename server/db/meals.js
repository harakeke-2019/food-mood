const connection = require('./index')

module.exports = {
    userMeals,
    newMeal
  }

function userMeals (db = connection) {
    return db('meals')
    .join('users', 'user_id', 'users.id')
    .where('user_id', id)
}

function newMeal (meals, db = connection) {
    newMeal = {
        title: meals.title,
        time: meals.time
    }
    return db('meals')
    .insert(newMeal)
}

