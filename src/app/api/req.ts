export interface Schedule {
  id: number;
  station_id: number;
  stasiun_name: string;
  arah: string;
  jadwal: string;
}


  
  
  export const fetchScheduleData = async (
    apiUrl: string
  ): Promise<Schedule[]> => {
  const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  if (!authToken) {
    throw new Error('Authorization token is not defined');
  }
  
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
