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
  if (!navigator.onLine) {
    throw new Error(
      "Jaringan Internet Anda Terputus. Pastikan Jaringan Anda Aktif."
    );
  }
  const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  if (!authToken) {
    throw new Error(
      "Authorization token is not defined. Hubungi Admin support@cekmrt.com."
    );
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error(
            "Bad Request 400: Server tidak dapat memahami permintaan karena sintaks yang tidak valid. Hubungi Admin support@cekmrt.com."
          );
        case 401:
          throw new Error(
            "Unauthorized 401: Kredensial yang tidak valid. Hubungi Admin support@cekmrt.com."
          );
        case 403:
          throw new Error(
            "Forbidden 403: Anda tidak memiliki izin untuk mengakses sumber daya ini. Hubungi Admin support@cekmrt.com."
          );
        case 404:
          throw new Error(
            "Not Found 404: Sumber daya yang diminta tidak dapat ditemukan. Hubungi Admin support@cekmrt.com."
          );
        case 500:
          throw new Error(
            "Internal Server Error 500: Server mengalami kesalahan Internal dan tidak dapat menyelesaikan permintaan Anda. Hubungi Admin support@cekmrt.com."
          );
        default:
          throw new Error(
            `Unexpected error: ${response.statusText} . Hubungi Admin support@cekmrt.com.`
          );
      }
    }

    const result: Schedule[] = await response.json();
    return result;
  } catch (error: any) {
    // Handle network-related errors here
    throw new Error("Network error: " + error.message);
  }
};
