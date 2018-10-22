# Calorie Counting App Plan / Notes

## Data Model
Example Model/Shape:

```javascript
meal = {
  id: 1,
  description: 'Breakfast',
  calories: 460
}

model = {
  meals: [],
  showForm: false,
  description: 'Dinner',
  calories: 600,
  editId: 3,
  nextId: 1,
}
```

## View Functions
view - main view returns the whole view

  formView - returns the whole form
    fieldSet - returns meal/calories form fields
    buttonSet - returns form buttons

  tableView - returns whole table
    tableHeader - table header
    mealsBody - list of meals
      mealRow - each row
        cell - each cell
      totalRow - totals row

## Update Functions
at minimum - an update function will need to take in the msg (idicate what 'action' to perform) and the current model to update.

interactions:
- click add meal - will set showForm: true
- key values int form fields - will update models fields for that meal
- clicking save will either save a new entry or edit existing (maybe needs a new function for adding and updating)
- clicking edit puts app into edit mode
- clicking delete deletes entry
