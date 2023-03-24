# Darkblock.io React Shared Components Library

## Getting Started 🚀

Install Darkblock's React Shared Component Library using `yarn` or `npm`

```
yarn add @darkblock.io/shared-components
```

```
npm i @darkblock.io/shared-components --save
```

Once the library is installed, import or require components into your codebase, i.e:

```
import {
  Header,
  Panel,
  Player,
  utils,
  widgetMachine
} from "@darkblock.io/shared-components"
```

## Styling - css classes defined in widget

On any other state than `display`.

```
.DarkblockWidget-App {
  .DarkblockWidget-Header {
    .DarkblockWidget-Header-Row {
      .Darkblock-Icon {
        .dbLogo {}
      }
    }
    .DarkblockWidget-Header-Row {
      .title { }
    }
    .DarkblockWidget-Header-Row {
      .content { }
    }
    .DarkblockWidget-Header-Row {
      .inner-button { }
    }
  }
  .DarkblockWidget-Stack-Panel{
    .stack-table {
      .rowheader {
        .name-header {}
        .format-header {}
        .format-date {}
        .format-icon {}
      }
      .row {
        .name {}
        .fomat {}
        .date {}
      }
    }
  }
  .DarkblockWidget-Footer{
    svg
  }
}

```

On `display` state

```
.DarkblockWidget-App {
  .DarkblockWidget-Player {
    .DarkblockWidget-Player-Content {
      .videoPlayer || .audioPlayer || #seadragon-viewer || iframe (pdf) || .zip-panel
    }
  }
  .DarkblockWidget-Stack-Panel{
    .stack-table {
      .rowheader {
        .name-header {}
        .format-header {}
        .date-header {}
      }
      .row {
        .name {}
        .fomat {}
        .date {}
      }
    }
  }
  .DarkblockWidget-Footer{
    svg
  }
}

```

The styling of these components can be overwritten by redifining these classes.
