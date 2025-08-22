import { Scene, Label, Color, Vector } from 'excalibur';
import { GeneticAlgorithm } from './genetic';

export class UI extends Scene {
  ga: GeneticAlgorithm;
  genLabel: Label;

  constructor(ga: GeneticAlgorithm) {
    super();
    this.ga = ga;
    this.genLabel = new Label({
      text: 'Generation: 0',
      pos: new Vector(10, 10),
      color: Color.White
    });
    this.add(this.genLabel);
  }

  onPreUpdate() {
    this.genLabel.text = `Generation: ${this.ga.generation}`;
  }
}
