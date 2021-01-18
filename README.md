## Notes

- The backend can be accessed via http://localhost:3001
- It runs with a package called ***json-server***, and the data comes from the ***db.json*** file
- Search performed on front-end level, although it can be moved to the back-end side  
- Lookup by video name, author & category

## Steps to run the project
- Install dependencies with:

```yarn install```

- Run both the frontend and backend with:

```yarn start```

## List view

![movingimage](./assets/01-landing-page.png)

### Requirements

- The landing page displays a list of videos with the following columns:
    - Video name
    - Author
    - Categories
    - Highest quality format (Values: ```<format-name> <quality>```, example: "two 1080p")
    - Release Date
    - Options (Buttons: ```Edit Delete```)
- The table/list can be searched
- **Optional**: The list can be sorted

Note: The "Highest quality format" is a made up label for the format where “res" property is the highest and “size" property is the biggest

## Add a video
UI Suggestion

![movingimage](./assets/02-add-video-page.png)

### Requirements

- Clicking on the “Add video” button will take you to a form, which contains the following fields:
    - Video name
    - Video author (```<select>```)
    - Video category (```<select multiple>```)
- A new video can be saved and the user will be returned to the list view
- The new video object should automatically get the following property/value:
```
formats: {
    one: { res: “1080p”, size: 1000 }
}
```
- The process can be canceled and by doing so, the user is redirected to the list view
- ***Optional***: There are basic validations available (e.g.: The "Save" button is only active if all the content is valid)

## Edit a video
UI Suggestion

![movingimage](./assets/03-edit-video-page.png)

### Requirements
- There is an interaction element to edit existing video information
- Clicking on this element will take you to a form view
- All changes can be saved (e.g.: If canceled, the user is returned to the list view)
- ***Optional***: There are basic validations available

## Delete a video
UI Suggestion

![movingimage](./assets/04-delete-video-button.png)

### Requirements
- There is an interaction element to delete an existing video
- ***Optional***: A dialog will appear to confirm the deletion