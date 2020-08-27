import { Entity } from './entity'
import { IUpdate } from '../update.h';
import { IAwake } from '../awake.h'

export interface IComponent extends IUpdate, IAwake {
    Entity: Entity | null
}