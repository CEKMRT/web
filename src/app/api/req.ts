export interface Schedule {
  id: number;
  station_id: number;
  stasiun_name: string;
  arah: string;
  jadwal: string;
}
// const authToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbWVuZyIsInVzZXJfaWQiOjIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzE2OTgwNzQ3fQ.dlDV-3EELKFTrUWD8N1KUmKJQmGVkpdlN5o_DMaIXm8";
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcl9pZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzQ4NDMxMjYzfQ.o1cRVeLyfWSexHM-atIIbKA7uwTU6jMYaBAWUhWlmtY";

  if (!authToken) {
    throw new Error('Authorization token is not defined');
  }


export const fetchScheduleData = async (
  apiUrl: string
): Promise<Schedule[]> => {
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,

    },
  });
  if (!response.ok) {

    switch (response.status) {
      case 400:
        throw new Error(
          "Bad Request: The server could not understand the request due to invalid syntax."
        );
      case 401:
        throw new Error(
          "Unauthorized: Access is denied due to invalid credentials."
        );
      case 403:
        throw new Error(
          "Forbidden: You do not have permission to access this resource."
        );
      case 404:
        throw new Error(
          "Not Found: The requested resource could not be found."
        );
      case 500:
        throw new Error(
          "Internal Server Error: The server encountered an internal error and was unable to complete your request."
        );
      default:
        throw new Error(`Unexpected error: ${response.statusText}`);
    }
  }


  const result: Schedule[] = await response.json();
  return result;
};
