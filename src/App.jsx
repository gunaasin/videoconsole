import { Box } from "@chakra-ui/react";
// import CodeEditor from "./components/CodeEditor";
import "./App.css"
import { Frame } from "./Frame";

function App() {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
<Frame/>
      {/* <CodeEditor /> */}
    </Box>
  );
}

export default App;
