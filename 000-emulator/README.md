# examples-websocket-scada-client

## Client + Device Emulator

### Client

- web-interface
  - pro-client
    - index.html
    - main.css
    - main.js
    - res.js
- websocket connection
  - WsID: WsProClient
  - WsHost: ws://localhost:8100

### Device Emulator

- web-interface
  - pro-client
    - device-emulator.html
- websocket connection
  - WsID: WsProClient
  - WsHost: ws://localhost:8100

### WebSocket-Server-Emulator

[Download ZIP](https://disk.yandex.ru/d/hzmGDPDvCIHcfQ)

- console application
  - server-emulator-run.bat
- websocket connection
  - WsID: WsProClient
  - WsPort: 8100 (listening)
