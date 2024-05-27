import React from "react";
import { CopyBlock, dracula, railscast, monokai } from "react-code-blocks";
import Link from "next/link";
const CodeBlockk = () => {
  const code = `
package main

import (
    "fmt"
    "net/http"
    "io"
)

func main() {
    url := "https://mrt-production.up.railway.app/api/schedules/"
    req, _ := http.NewRequest("GET", url, nil)
    res, _ := http.DefaultClient.Do(req)
    defer res.Body.Close()
    body, _ := io.ReadAll(res.Body)
    
    fmt.Println(res)
    fmt.Println(string(body))
}
`;

  return (
    <div className="mx-4 md:mx-20 overflow-auto max-w-full">
      <CopyBlock
        text={code}
        language="Go"
        showLineNumbers={true}
        theme={dracula}
      />
    </div>
  );
};

export default CodeBlockk;
