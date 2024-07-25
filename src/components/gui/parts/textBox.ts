import { Text, TextStyle } from "pixi.js";

export class TextBox {
  content: string;
  style: TextStyle;
  self: Text;

  constructor(content: string) {
    this.content = content;

    this.style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 36,
      fontStyle: "italic",
      fontWeight: "bold",
      stroke: { color: "#4a1850", width: 5, join: "round" },
      dropShadow: {
        color: "#000000",
        blur: 4,
        angle: Math.PI / 6,
        distance: 6,
      },
      wordWrap: true,
      wordWrapWidth: 440,
    });

    this.self = new Text({
      text: this.content,
      style: this.style,
    });
  }
}
