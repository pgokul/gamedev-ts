import { IComponent } from './component.h'
import { Option } from 'prelude-ts'
import { IUpdate } from '../update.h'
import { IAwake } from '../awake.h'

interface IConstructor<T> {
    new(...args: any[]): T;

    // Or enforce default constructor
    // new (): T;
}

export abstract class Entity implements IUpdate, IAwake {

    Awake(): void {
        for (const c of this._components)
            c.Awake()
    }

    public Update(deltaTime: number): void {
        for (const c of this._components)
            c.Update(deltaTime)
    }
    protected _components: Set<IComponent> = new Set()

    public get Components(): Set<IComponent> {
        return this._components
    }

    public AddComponent(component: IComponent): void {
        this._components.add(component)
        component.Entity = this
    }

    /* confusing see
    https://stackoverflow.com/questions/24677592/generic-type-inference-with-class-argument/26696435#26696435
    Replacing 
    public GetComponent<C extends IComponent>(constr: { new(...args: any[]): C ) :C 
        with an easier to read version
    */
    public GetComponent<C extends IComponent>(type: IConstructor<C>): C {
        return this._getComponent(type).getOrThrow(`Component ${type.name} not found on Entity ${this.constructor.name}`);
    }

    public RemoveComponent<C extends IComponent>(type: IConstructor<C>): void {
        this._getComponent(type).ifSome(comp => this._components.delete(comp))
    }

    public HasComponent<C extends IComponent>(type: IConstructor<C>): boolean {
        return this._getComponent(type).isSome()
    }

    private _getComponent<C extends IComponent>(type: IConstructor<C>): Option<C> {
        for (let comp of this._components) {
            if (comp instanceof type)
                return Option.of(comp as unknown as C)
        }
        return Option.none()
    }


}

