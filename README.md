# BoardGameGeek Similarity

An API that takes two BoardGameGeek usernames as input and returns cosine similarity measure.

## Running Locally

To run the API locally, follow these steps:

1. Ensure you have Node.js version 20 installed.

2. Clone the repository:

   ```bash
   git clone https://github.com/paouy/bgg-similarity
   cd bgg-similarity
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. The API will be available at `http://localhost:4321`. You can make requests to the endpoint as shown below.

## API Reference

### Measure Similarity

#### HTTP Request

`POST /api/measure-similarity`

#### Query Parameters

| Parameter        | Type    | Required | Description                                                               |
| ---------------- | ------- | -------- | ------------------------------------------------------------------------- |
| entireCollection | boolean | No       | If `true`, the entire board game collections of the users are considered. |

#### Request Body

```json
{
  "usernames": ["username1", "username2"]
}
```

| Field     | Type  | Required | Description                      |
| --------- | ----- | -------- | -------------------------------- |
| usernames | array | Yes      | An array of exactly 2 usernames. |

#### Response

##### Success (200 OK)

```json
{
  "score": 0.83
}
```

| Field | Type    | Description                  |
| ----- | ------- | ---------------------------- |
| score | integer | The cosine similarity score. |
