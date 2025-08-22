import { Actor, Color, Engine, Label, Font, FontUnit, Scene, Vector } from 'excalibur';
import { Simulation } from '../genetic/simulation';

export class UI extends Actor {
  public genLabel: Label;
  public aliveLabel: Label;
  public totalLabel: Label;
  private simulation: Simulation;
  constructor(simulation: Simulation) {
    super();
    this.simulation = simulation;
    this.genLabel = new Label({
      text: 'Generation: 0',
      pos: new Vector(20, (simulation.engine?.drawHeight ?? 520) + 180),
      font: new Font({ size: 24, unit: FontUnit.Px, color: Color.Black }),
    });
    this.aliveLabel = new Label({
      text: 'Alive: 0',
      pos: new Vector(20, (simulation.engine?.drawHeight ?? 520) + 150),
      font: new Font({ size: 24, unit: FontUnit.Px, color: Color.Black }),
    });
    this.totalLabel = new Label({
      text: 'Total: 0',
      pos: new Vector(20, (simulation.engine?.drawHeight ?? 520) + 120),
      font: new Font({ size: 24, unit: FontUnit.Px, color: Color.Black }),
    });
    this.addChild(this.genLabel);
    this.addChild(this.aliveLabel);
    this.addChild(this.totalLabel);
  }

  onPreUpdate(engine: Engine, delta: number) {
    this.genLabel.text = `Generation: ${this.simulation.generation}`;
    this.aliveLabel.text = `Alive: ${this.simulation.aliveCount}`;
    this.totalLabel.text = `Total: ${this.simulation.cars.length}`;
  }
}
