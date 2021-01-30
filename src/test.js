// This recipe teaches you how to update a customized
// Masonry component when switching between routes that utilize
// the same <Route> component, e.g. when filtering items
// by category
import React from "react";
import ReactDOM from "react-dom";
import useWindowScroll from "@react-hook/window-scroll";
import useWindowSize from "@react-hook/window-size";
import { BrowserRouter, Route, Link, useParams } from "react-router-dom";
import catNames from "cat-names";
import cats from "./cats";
import { styles } from "./theme";
import {
  usePositioner,
  useResizeObserver,
  useContainerPosition,
  MasonryScroller
} from "masonic";

const MyMasonry = () => {
  const containerRef = React.useRef(null);
  const [items, setItems] = React.useState(getFakeItems);
  const { page = "cats" } = useParams();
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight
  ]);
  // The key to this entire example lies in the usePositioner()
  // hook
  const positioner = usePositioner(
    { width, columnWidth: 172, columnGutter: 8 },
    // This is our dependencies array. When these dependencies
    // change, the positioner cache will be cleared and the
    // masonry component will reset as a result.
    [items]
  );

  const resizeObserver = useResizeObserver(positioner);

  React.useEffect(() => {
    setItems(
      getFakeItems(randomChoice([4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]))
    );
  }, [page]);

  const otherPage = page === "cats" ? "kittens" : "cats";

  return (
    <div>
      <div className={style("links")}>
        <span>filter by:</span>
        <h2>{page}</h2>
        <Link to={`/${otherPage}`}>{otherPage}</Link>
      </div>
      <MasonryScroller
        positioner={positioner}
        resizeObserver={resizeObserver}
        containerRef={containerRef}
        items={items}
        height={windowHeight}
        offset={offset}
        overscanBy={6}
        render={FakeCard}
      />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <main className={style("container")}>
        <div className={style("masonic")}>
          <Route path="/:page?">
            <MyMasonry />
          </Route>
        </div>
        <Header />
      </main>
    </BrowserRouter>
  );
};

const FakeCard = ({ data: { id, name, src } }) => (
  <div className={style("card")}>
    <img className={style("img")} alt="kitty" src={src} />
    <span children={name} />
  </div>
);

const Header = () => {
  const scrollY = useWindowScroll(5);
  return (
    <h1 className={style("header", scrollY > 64 && "minify")}>
      <span role="img" aria-label="bricks">
        🧱
      </span>{" "}
      MASONIC
    </h1>
  );
};

const style = styles({
  masonic: `
    padding: 8px;
    width: 100%;
    max-width: 960px;
    margin: 163px auto;
  `,
  container: `
    min-height: 100vh;
    width: 100%;
  `,
  minify: ({ pad, color }) => `
    padding: ${pad.md};
    background-color: ${color.dark};
    color: ${color.light};
  `,
  header: ({ pad, color }) => `
    font-family: Quantico, sans-serif;
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: -0.075em;
    color: ${color.body};
    top: 0;
    position: fixed;
    padding: ${pad.xl};
    z-index: 1000;
    width: 100%;
    text-align: center;
    transition: padding 200ms ease-in-out, background-color 200ms 200ms linear;
  `,
  card: ({ shadow, color, pad, radius }) => `
    display: flex;
    flex-direction: column;
    background: ${color.dark};
    border-radius: ${radius.lg};
    justify-content: center;
    align-items: center;
    transition: transform 100ms ease-in-out;
    width: 100%;

    span:last-of-type {
      color: #fff;
      padding: ${pad.md};
    }

    &:hover {
      position: relative;
      background: ${color.light};
      transform: scale(1.125);
      z-index: 1000;
      box-shadow: ${shadow.lg};

      span:last-of-type {
        color: ${color.dark};
        padding: ${pad.md};
      }
    }
  `,
  img: ({ radius }) => `
    width: 100%;
    display: block;
    border-top-left-radius: ${radius.md};
    border-top-right-radius: ${radius.md};
    display: block;
  `,
  links: ({ pad }) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: bold;
    gap: 1ch;
    padding: ${pad.md};

    h2 {
      font-size: 1rem;
    }
  `
});

const randomChoice = (items) => items[Math.floor(Math.random() * items.length)];
const getFakeItems = (count = 0) => {
  const fakeItems = [];
  for (let i = 0; i < count; i++)
    fakeItems.push({ id: i, name: catNames.random(), src: randomChoice(cats) });
  return fakeItems;
};

ReactDOM.render(<App />, document.getElementById("root"));
