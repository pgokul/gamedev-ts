import { Entity } from '@/utils'

export class Game extends Entity {
    private _lastTimeStamp = 0

    constructor() {
        super()
        this.Update()
    }

    public Update(): void {
        const deltaTime = (Date.now() - this._lastTimeStamp) / 1000
        super.Update(deltaTime)
        this._lastTimeStamp = Date.now()
        window.requestAnimationFrame(() => this.Update())
    }

}
