// codeExamples.ts

// Define type for code examples
export type CodeExamples = {
    [key: string]: string;
  };
  
  // Define code examples for different languages
  export const codeExamples: CodeExamples = {
    javascript: `fetch('https://api.cekmrt.xyz/api/schedules', {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data));`,
    python: `import requests
  
  response = requests.get('https://api.cekmrt.xyz/api/schedules', headers={'Authorization': 'Bearer YOUR_API_KEY'})
  data = response.json()
  print(data)`,
    // Add more code examples for other languages here
    java: `import java.net.HttpURLConnection;
  import java.net.URL;
  import java.io.BufferedReader;
  import java.io.InputStreamReader;
  
  public class Main {
    public static void main(String[] args) throws Exception {
      URL url = new URL("https://api.cekmrt.xyz/api/schedules");
      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.setRequestMethod("GET");
      con.setRequestProperty("Authorization", "Bearer YOUR_API_KEY");
  
      BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
      String inputLine;
      StringBuffer content = new StringBuffer();
      while ((inputLine = in.readLine()) != null) {
        content.append(inputLine);
      }
      in.close();
      System.out.println(content.toString());
    }
  }`,
    golang: `package main
  
  import (
      "fmt"
      "net/http"
      "io/ioutil"
  )
  
  func main() {
      url := "https://api.cekmrt.xyz/api/schedules"
      req, _ := http.NewRequest("GET", url, nil)
      req.Header.Add("Authorization", "Bearer YOUR_API_KEY")
  
      res, _ := http.DefaultClient.Do(req)
      defer res.Body.Close()
      body, _ := ioutil.ReadAll(res.Body)
  
      fmt.Println(string(body))
  }`,
  };
  