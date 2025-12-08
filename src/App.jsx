import Banner from "./Banner";
import CardDrawer from "./CardDrawer";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <Banner />
        <h1 className="title">Lusófona Games TCG</h1>
      </header>
      <main className="content">
        <CardDrawer />
      </main>
      <footer className="footer">
        <div>Lusófona Games TCG</div>
      </footer>
    </>
  );
}

export default App;
