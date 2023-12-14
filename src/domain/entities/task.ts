export default class Task {
  id: number;
  title: string;
  done: boolean;
  constructor(title: string) {
    this.title = title;
    this.done = false;
    this.id = 0;
  }
}
