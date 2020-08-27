import { Entity } from './entity'
import { IComponent } from "./component.h";

class E extends Entity { }
class C1 implements IComponent {
    public Update(deltaTime: number): void { }
    public Entity: E
}
class C2 implements IComponent {
    public Update(deltaTime: number): void { }
    public Entity: E
}
class C3 implements IComponent {
    public Update(deltaTime: number): void { }
    public Entity: E
}

describe('>>> Entity', () => {
    let e: E
    const c1 = new C1()
    const c2 = new C2()
    const c3 = new C3()

    beforeEach(() => {
        e = new E()
    })

    it('should add, remove, get, and check components', () => {
        expect(e.Components.size).toBe(0)
        e.AddComponent(c1)
        e.AddComponent(c2)
        e.AddComponent(c3)

        expect(e.Components.size).toBe(3)
        expect(e.HasComponent(C1)).toBeTruthy()
        expect(e.HasComponent(C2)).toBeTruthy()
        expect(e.HasComponent(C3)).toBeTruthy()

        e.RemoveComponent(C2)
        expect(e.HasComponent(C1)).toBeTruthy()
        expect(e.HasComponent(C2)).toBeFalsy()
        expect(e.HasComponent(C3)).toBeTruthy()

        expect(e.GetComponent(C1)).toBe(c1)
        expect(e.GetComponent(C3)).toBe(c3)
    })

    it('should throw if component is not present', () => {
        expect(e.Components.size).toBe(0)
        expect(e.HasComponent(C1)).toBeFalsy()
        expect(() => e.GetComponent(C1)).toThrow()
    })

    it('should update all components', () => {
        const spy1 = jest.spyOn(c1, 'Update')
        const spy2 = jest.spyOn(c2, 'Update')
        const spy3 = jest.spyOn(c3, 'Update')
        expect(spy1).not.toBeCalled()
        expect(spy2).not.toBeCalled()
        expect(spy3).not.toBeCalled()

        jest.resetAllMocks()

        e.AddComponent(c1)
        e.AddComponent(c2)
        e.AddComponent(c3)

        const deltaTime = 12
        e.Update(deltaTime)

        expect(spy1).toBeCalledWith(deltaTime)
        expect(spy2).toBeCalledWith(deltaTime)
        expect(spy3).toBeCalledWith(deltaTime)

        jest.resetAllMocks()

        e.RemoveComponent(C1)
        const deltaTime1 = 12
        e.Update(deltaTime1)

        expect(spy1).not.toBeCalled()
        expect(spy2).toBeCalledWith(deltaTime1)
        expect(spy3).toBeCalledWith(deltaTime1)
    })

});