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
    throw new Error("Authorization token is not defined");
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
          "Permintaan Buruk: Server tidak dapat memahami permintaan karena sintaks yang tidak valid."
        );
      case 401:
        throw new Error(
          "Tidak Sah: Akses ditolak karena kredensial yang tidak valid."
        );
      case 403:
        throw new Error(
          "Dilarang: Anda tidak memiliki izin untuk mengakses sumber daya ini."
        );
      case 404:
        throw new Error(
          "Tidak Ditemukan: Sumber daya yang diminta tidak dapat ditemukan."
        );
      case 500:
        throw new Error(
          "Kesalahan Server Internal: Server mengalami kesalahan internal dan tidak dapat menyelesaikan permintaan Anda."
        );
      default:
        throw new Error(`Kesalahan tak terduga: ${response.statusText}`);
    }
  }

  const result: Schedule[] = await response.json();
  return result;
};
