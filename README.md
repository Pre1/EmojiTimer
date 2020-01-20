# EmojiTimer
Timer component with your prefred emoji ☕️

## Installation
---

As of right now, just `git clone` the repo into your prject directory (`src/`)

later, we'll add it to NPM ~ 


## Usage example
---

```javaScript
import EmojiTimer from "./EmojiTimer/src";

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <EmojiTimer 
            prefredEmoji="🧗‍♀️"
            duration={0.1}
            timerStarted={true} 
        />

      </header>
    </div>
  );
}
```

The timer has some default styling (little adjustment here and there) with default strting/ending animation
that you can override.

## Props
---

| name                   |                          type                           |                                description |
| ---------------------- | :-----------------------------------------------------: | -----------------------------------------: |
| *duration*             |                   Number: *required*                    |              timer duration in **minutes** |
| *prefredEmoji*         |                         String                          |                         your prefred Emoji |
| *startingAnimation*    |                   String: *className*                   |   starting animation when the timer starts |
| *endingAnimation*      |                   String: *className*                   |          ending animation when timer's off |
| *conditionalAnimation* | Object: `{targetTimerInMin: String, animation: String}` |  animation which palyed at a certain time. |
| *timerStarted*         |                         boolean                         |             control timer's starting point |
| *onTimerOff*           |                          func                           |   callback function when the timer stopped |
| *className*            |                         String                          | classNames for your timer's container view |
| *styleContainer*       |                         Object                          |    style object for timer's container view |
| *styleTimer*           |                         Object                          |                   style object for timer's |

