
FLASHBACK SERVER

1.This is the backend of an FlashBack web application.

2.FlashBack is used to allow users post interesting events that happen to their lives and to like ,edit,delete and comment on the posts.






## API Reference

#### Get all items


  https://flashback-server.herokuapp.com/


| Method | URL   | Description                |
| :-------- | :------- | :------------------------- |
|GET |   /  |get posts|
|POST|/|creating a post|
|GET | /:id |get post|
| PATCH | /:id/auth| Update post|
|   DELETE | /:id/delete| Delete a post|
| PATCH | /:id/likePost| Like Posts|
|POST|/:id/commentPost|Comment on posts|
|GET|/creator|get posts by creator|
|   GET | /search | Get post by search |
| POST	 | /signup |Creates a user using the information sent inside the request body |
|  POST | /signin | Checks if user is email authenticated using infomation in request body,and allows login for authenticated users|
|PUT|/user/forgot|Reseting user password|
|PUT|/user/verify|Authenticated user using token passed inside request body|
|POST	|/google-login|	To sign-in with google|



#### Tech Stack


Server: Node, Express Database: MongoDB Atlas
