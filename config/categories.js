const categories = 
{
    "categories": {
      "expenses": {
        "Housing": [
          "Rent",
          "Mortgage",
          "Property Taxes",
          "Home Insurance",
          "Maintenance"
        ],
        "Utilities": [
          "Electricity",
          "Water",
          "Gas",
          "Trash",
          "Internet",
          "Phone"
        ],
        "Transportation": [
          "Car Payment",
          "Car Insurance",
          "Gas",
          "Public Transportation",
          "Maintenance",
          "Parking"
        ],
        "Food": [
          "Groceries",
          "Dining Out",
          "Coffee",
          "Snacks"
        ],
        "Health": [
          "Insurance",
          "Doctor",
          "Dentist",
          "Medication",
          "Gym",
          "Therapy"
        ],
        "Entertainment": [
          "Movies",
          "Concerts",
          "Sports",
          "Streaming Services",
          "Games"
        ],
        "Personal Care": [
          "Haircuts",
          "Skincare",
          "Cosmetics",
          "Spa"
        ],
        "Education": [
          "Tuition",
          "Books",
          "Supplies",
          "Courses",
          "Student Loan"
        ],
        "Gifts and Donations": [
          "Charity",
          "Birthday Gifts",
          "Holiday Gifts",
          "Wedding Gifts"
        ],
        "Insurance": [
          "Life Insurance",
          "Health Insurance",
          "Home Insurance",
          "Auto Insurance"
        ],
        "Savings and Investments": [
          "Emergency Fund",
          "Retirement",
          "Stocks",
          "Bonds",
          "Real Estate"
        ],
        "Debt Payments": [
          "Credit Card",
          "Student Loan",
          "Personal Loan",
          "Mortgage"
        ],
        "Miscellaneous": [
          "Pet Care",
          "Subscriptions",
          "Laundry",
          "Postage"
        ]
      },
      "income": [
        "Salary",
        "Business Income",
        "Freelance",
        "Investments",
        "Rental Income",
        "Pension",
        "Social Security",
        "Gifts",
        "Other"
      ]
    }
  }
  
// console.log(categories.categories.expenses);
// console.log(categories.categories.income);

const expenses_cat = Object.keys(categories.categories.expenses)
const income_cat = categories.categories.income

  module.exports = { expenses_cat, income_cat }