import CreateLinkForm from "./components/CreateLinkForm";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>URL Shortener</h1>
      <CreateLinkForm />
      <LinkList />
    </div>
  );
}

export default App;
