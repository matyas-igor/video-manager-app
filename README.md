## Notes

- The backend can be accessed via http://localhost:3001
- It runs with a package called **_json-server_**, and the data comes from the **_db.json_** file
- Search performed on front-end level, although it can be moved to the back-end side
- Lookup by video name, author & category

## Steps to run the project

- Install dependencies with:

`yarn install`

- Run both the frontend and backend with:

`yarn start`

## List view

![Screen Shot 2021-01-18 at 15 08 32](https://user-images.githubusercontent.com/3536796/104913942-a564b200-598e-11eb-984c-8c409485be7c.png)

![Screen Shot 2021-01-18 at 15 08 45](https://user-images.githubusercontent.com/3536796/104913989-bc0b0900-598e-11eb-89d0-b1d75776e4be.png)

### Specs

- The landing page displays a list of videos with the following columns:
  - Video name
  - Author
  - Categories
  - Options (Buttons: `Edit` and `Delete`)
- The table/list can be searched
- The list can be sorted

## Add a video

![Screen Shot 2021-01-18 at 15 09 15](https://user-images.githubusercontent.com/3536796/104914069-dc3ac800-598e-11eb-84f9-06e7130a95bd.png)

### Specs

- Clicking on the “Add video” button will take you to a form, which contains the following fields:
  - Video name
  - Video author (`<select>`)
  - Video category (`<select multiple>`)
- A new video can be saved and the user will be returned to the list view
- The process can be canceled and by doing so, the user is redirected to the list view
- There are basic validations available (e.g.: The "Save" button is only active if all the content is valid)

## Edit a video

![Screen Shot 2021-01-18 at 15 09 11](https://user-images.githubusercontent.com/3536796/104914042-d218c980-598e-11eb-9f33-a0b53329e7a6.png)

### Specs

- There is an interaction element to edit existing video information
- Clicking on this element will take you to a form view
- All changes can be saved (e.g.: If canceled, the user is returned to the list view)
- There are basic validations available

## Delete a video

![Screen Shot 2021-01-18 at 15 08 59](https://user-images.githubusercontent.com/3536796/104914008-c62d0780-598e-11eb-8a99-aa02721eaf0d.png)

### Specs

- There is an interaction element to delete an existing video
- A dialog will appear to confirm the deletion
