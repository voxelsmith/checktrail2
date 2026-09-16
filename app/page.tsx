import Link from "next/link";

/**
 * Category picker shell.
 * Visuals live in /public/ui/hub/hub.css — replace that CSS (and this markup classes) for the real UI.
 * Do not move game logic here; Category 1/2 run from /public/logic + /public/ui/category*.
 */
export default function Page() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Patrick+Hand&display=swap"
        rel="stylesheet"
      />
      <link href="/ui/hub/hub.css" rel="stylesheet" />
      <link href="/ui/theme/scribble.css" rel="stylesheet" />
      <main className="hub" data-ui="hub.screen" data-ui-type="screen">
        <div className="hub-inner">
          <div className="ui-art-slot" data-ui="hub.art" data-ui-type="image">
            <span className="ui-art-placeholder">Add a cover image</span>
          </div>
          <p className="hub-brand" data-ui="hub.brand" data-ui-type="text">
            Checktrail
          </p>
          <h1 className="hub-title" data-ui="hub.title" data-ui-type="text">
            Pick a category
          </h1>
          <p className="hub-sub" data-ui="hub.sub" data-ui-type="text">
            Hosts choose the game first, then create a room. Friends who get your
            invite link join that room directly.
          </p>

          <div className="hub-grid">
            <Link href="/game.html?host=1" className="hub-card hub-card--c1" data-ui="hub.card1" data-ui-type="button">
              <span className="hub-card-eyebrow">Category 1</span>
              <span className="hub-card-name" data-ui="hub.card1.name" data-ui-type="text">
                Anon Wheel
              </span>
              <span className="hub-card-desc" data-ui="hub.card1.desc" data-ui-type="text">
                Secret questions, spinning wheel, rapid-fire finale
              </span>
            </Link>

            <Link href="/category2.html?host=1" className="hub-card hub-card--c2" data-ui="hub.card2" data-ui-type="button">
              <span className="hub-card-eyebrow">Category 2</span>
              <span className="hub-card-name" data-ui="hub.card2.name" data-ui-type="text">
                Mirror Vote
              </span>
              <span className="hub-card-desc" data-ui="hub.card2.desc" data-ui-type="text">
                Shuffled “most likely” votes, charts, and your trait portrait
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
