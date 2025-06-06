// @generated by protobuf-ts 2.10.0
// @generated from protobuf file "orders.proto" (package "orders", syntax proto3)
// tslint:disable
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message orders.Positions
 */
export interface Positions {
}
/**
 * @generated from protobuf message orders.DeleteOrders
 */
export interface DeleteOrders {
    /**
     * @generated from protobuf field: string mint = 1;
     */
    mint: string;
    /**
     * @generated from protobuf field: repeated int64 ids = 2;
     */
    ids: bigint[];
}
/**
 * @generated from protobuf message orders.PlaceLimitOrdersResponce
 */
export interface PlaceLimitOrdersResponce {
    /**
     * @generated from protobuf field: uint32 token_orders_num = 1;
     */
    tokenOrdersNum: number;
    /**
     * @generated from protobuf field: repeated int64 ids = 2;
     */
    ids: bigint[];
}
/**
 * @generated from protobuf message orders.TokenLimitOrders
 */
export interface TokenLimitOrders {
    /**
     * @generated from protobuf field: string mint = 1;
     */
    mint: string;
    /**
     * @generated from protobuf field: repeated orders.ApiOrder orders = 2;
     */
    orders: ApiOrder[];
}
/**
 * @generated from protobuf message orders.ApiOrder
 */
export interface ApiOrder {
    /**
     * @generated from protobuf field: optional int64 id = 1;
     */
    id?: bigint;
    /**
     * @generated from protobuf field: uint32 slippage_bps = 2;
     */
    slippageBps: number;
    /**
     * @generated from protobuf field: uint64 tip = 3;
     */
    tip: bigint;
    /**
     * @generated from protobuf field: orders.Target target = 4;
     */
    target?: Target;
    /**
     * @generated from protobuf field: orders.Side side = 5;
     */
    side: Side;
    /**
     * @generated from protobuf field: orders.Amount amount = 6;
     */
    amount?: Amount;
    /**
     * @generated from protobuf field: orders.Trigger trigger = 7;
     */
    trigger: Trigger;
}
/**
 * @generated from protobuf message orders.Target
 */
export interface Target {
    /**
     * @generated from protobuf oneof: target_type
     */
    targetType: {
        oneofKind: "price";
        /**
         * @generated from protobuf field: orders.TargetPrice price = 1;
         */
        price: TargetPrice;
    } | {
        oneofKind: "profit";
        /**
         * @generated from protobuf field: orders.TargetProfit profit = 2;
         */
        profit: TargetProfit;
    } | {
        oneofKind: "movingPerc";
        /**
         * @generated from protobuf field: orders.TargetMovingPerc moving_perc = 3;
         */
        movingPerc: TargetMovingPerc;
    } | {
        oneofKind: "market";
        /**
         * @generated from protobuf field: orders.Market market = 4;
         */
        market: Market;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message orders.TargetPrice
 */
export interface TargetPrice {
    /**
     * @generated from protobuf field: float price = 1;
     */
    price: number;
    /**
     * @generated from protobuf field: orders.Direction direction = 2;
     */
    direction: Direction;
}
/**
 * @generated from protobuf message orders.TargetProfit
 */
export interface TargetProfit {
    /**
     * @generated from protobuf field: float profit_perc = 1;
     */
    profitPerc: number;
    /**
     * @generated from protobuf field: orders.Direction direction = 2;
     */
    direction: Direction;
}
/**
 * @generated from protobuf message orders.TargetMovingPerc
 */
export interface TargetMovingPerc {
    /**
     * @generated from protobuf field: float price_perc = 1;
     */
    pricePerc: number;
    /**
     * @generated from protobuf field: optional float local_ath = 2;
     */
    localAth?: number;
    /**
     * @generated from protobuf field: orders.Direction direction = 3;
     */
    direction: Direction;
}
/**
 * @generated from protobuf message orders.Market
 */
export interface Market {
}
/**
 * @generated from protobuf message orders.Amount
 */
export interface Amount {
    /**
     * @generated from protobuf oneof: amount_type
     */
    amountType: {
        oneofKind: "percBps";
        /**
         * @generated from protobuf field: uint32 perc_bps = 1;
         */
        percBps: number;
    } | {
        oneofKind: "fixed";
        /**
         * @generated from protobuf field: uint64 fixed = 2;
         */
        fixed: bigint;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf enum orders.Trigger
 */
export enum Trigger {
    /**
     * @generated from protobuf enum value: IMMEDIATE = 0;
     */
    IMMEDIATE = 0,
    /**
     * @generated from protobuf enum value: MIGRATION = 1;
     */
    MIGRATION = 1
}
/**
 * @generated from protobuf enum orders.Side
 */
export enum Side {
    /**
     * @generated from protobuf enum value: BUY = 0;
     */
    BUY = 0,
    /**
     * @generated from protobuf enum value: SELL = 1;
     */
    SELL = 1
}
/**
 * @generated from protobuf enum orders.Direction
 */
export enum Direction {
    /**
     * @generated from protobuf enum value: ABOVE = 0;
     */
    ABOVE = 0,
    /**
     * @generated from protobuf enum value: BELOW = 1;
     */
    BELOW = 1
}
// @generated message type with reflection information, may provide speed optimized methods
class Positions$Type extends MessageType<Positions> {
    constructor() {
        super("orders.Positions", []);
    }
    create(value?: PartialMessage<Positions>): Positions {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<Positions>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Positions): Positions {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Positions, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message orders.Positions
 */
export const Positions = new Positions$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteOrders$Type extends MessageType<DeleteOrders> {
    constructor() {
        super("orders.DeleteOrders", [
            { no: 1, name: "mint", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 3 /*ScalarType.INT64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value?: PartialMessage<DeleteOrders>): DeleteOrders {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.mint = "";
        message.ids = [];
        if (value !== undefined)
            reflectionMergePartial<DeleteOrders>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: DeleteOrders): DeleteOrders {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string mint */ 1:
                    message.mint = reader.string();
                    break;
                case /* repeated int64 ids */ 2:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.ids.push(reader.int64().toBigInt());
                    else
                        message.ids.push(reader.int64().toBigInt());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: DeleteOrders, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string mint = 1; */
        if (message.mint !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.mint);
        /* repeated int64 ids = 2; */
        if (message.ids.length) {
            writer.tag(2, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.ids.length; i++)
                writer.int64(message.ids[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message orders.DeleteOrders
 */
export const DeleteOrders = new DeleteOrders$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PlaceLimitOrdersResponce$Type extends MessageType<PlaceLimitOrdersResponce> {
    constructor() {
        super("orders.PlaceLimitOrdersResponce", [
            { no: 1, name: "token_orders_num", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 3 /*ScalarType.INT64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value?: PartialMessage<PlaceLimitOrdersResponce>): PlaceLimitOrdersResponce {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.tokenOrdersNum = 0;
        message.ids = [];
        if (value !== undefined)
            reflectionMergePartial<PlaceLimitOrdersResponce>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PlaceLimitOrdersResponce): PlaceLimitOrdersResponce {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 token_orders_num */ 1:
                    message.tokenOrdersNum = reader.uint32();
                    break;
                case /* repeated int64 ids */ 2:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.ids.push(reader.int64().toBigInt());
                    else
                        message.ids.push(reader.int64().toBigInt());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PlaceLimitOrdersResponce, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 token_orders_num = 1; */
        if (message.tokenOrdersNum !== 0)
            writer.tag(1, WireType.Varint).uint32(message.tokenOrdersNum);
        /* repeated int64 ids = 2; */
        if (message.ids.length) {
            writer.tag(2, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.ids.length; i++)
                writer.int64(message.ids[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message orders.PlaceLimitOrdersResponce
 */
export const PlaceLimitOrdersResponce = new PlaceLimitOrdersResponce$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TokenLimitOrders$Type extends MessageType<TokenLimitOrders> {
    constructor() {
        super("orders.TokenLimitOrders", [
            { no: 1, name: "mint", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "orders", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => ApiOrder }
        ]);
    }
    create(value?: PartialMessage<TokenLimitOrders>): TokenLimitOrders {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.mint = "";
        message.orders = [];
        if (value !== undefined)
            reflectionMergePartial<TokenLimitOrders>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TokenLimitOrders): TokenLimitOrders {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string mint */ 1:
                    message.mint = reader.string();
                    break;
                case /* repeated orders.ApiOrder orders */ 2:
                    message.orders.push(ApiOrder.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: TokenLimitOrders, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string mint = 1; */
        if (message.mint !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.mint);
        /* repeated orders.ApiOrder orders = 2; */
        for (let i = 0; i < message.orders.length; i++)
            ApiOrder.internalBinaryWrite(message.orders[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message orders.TokenLimitOrders
 */
export const TokenLimitOrders = new TokenLimitOrders$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ApiOrder$Type extends MessageType<ApiOrder> {
    constructor() {
        super("orders.ApiOrder", [
            { no: 1, name: "id", kind: "scalar", opt: true, T: 3 /*ScalarType.INT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "slippage_bps", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "tip", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 4, name: "target", kind: "message", T: () => Target },
            { no: 5, name: "side", kind: "enum", T: () => ["orders.Side", Side] },
            { no: 6, name: "amount", kind: "message", T: () => Amount },
            { no: 7, name: "trigger", kind: "enum", T: () => ["orders.Trigger", Trigger] }
        ]);
    }
    create(value?: PartialMessage<ApiOrder>): ApiOrder {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.slippageBps = 0;
        message.tip = 0n;
        message.side = 0;
        message.trigger = 0;
        if (value !== undefined)
            reflectionMergePartial<ApiOrder>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ApiOrder): ApiOrder {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional int64 id */ 1:
                    message.id = reader.int64().toBigInt();
                    break;
                case /* uint32 slippage_bps */ 2:
                    message.slippageBps = reader.uint32();
                    break;
                case /* uint64 tip */ 3:
                    message.tip = reader.uint64().toBigInt();
                    break;
                case /* orders.Target target */ 4:
                    message.target = Target.internalBinaryRead(reader, reader.uint32(), options, message.target);
                    break;
                case /* orders.Side side */ 5:
                    message.side = reader.int32();
                    break;
                case /* orders.Amount amount */ 6:
                    message.amount = Amount.internalBinaryRead(reader, reader.uint32(), options, message.amount);
                    break;
                case /* orders.Trigger trigger */ 7:
                    message.trigger = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ApiOrder, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional int64 id = 1; */
        if (message.id !== undefined)
            writer.tag(1, WireType.Varint).int64(message.id);
        /* uint32 slippage_bps = 2; */
        if (message.slippageBps !== 0)
            writer.tag(2, WireType.Varint).uint32(message.slippageBps);
        /* uint64 tip = 3; */
        if (message.tip !== 0n)
            writer.tag(3, WireType.Varint).uint64(message.tip);
        /* orders.Target target = 4; */
        if (message.target)
            Target.internalBinaryWrite(message.target, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* orders.Side side = 5; */
        if (message.side !== 0)
            writer.tag(5, WireType.Varint).int32(message.side);
        /* orders.Amount amount = 6; */
        if (message.amount)
            Amount.internalBinaryWrite(message.amount, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        /* orders.Trigger trigger = 7; */
        if (message.trigger !== 0)
            writer.tag(7, WireType.Varint).int32(message.trigger);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message orders.ApiOrder
 */
export const ApiOrder = new ApiOrder$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Target$Type extends MessageType<Target> {
    constructor() {
        super("orders.Target", [
            { no: 1, name: "price", kind: "message", oneof: "targetType", T: () => TargetPrice },
            { no: 2, name: "profit", kind: "message", oneof: "targetType", T: () => TargetProfit },
            { no: 3, name: "moving_perc", kind: "message", oneof: "targetType", T: () => TargetMovingPerc },
            { no: 4, name: "market", kind: "message", oneof: "targetType", T: () => Market }
        ]);
    }
    create(value?: PartialMessage<Target>): Target {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.targetType = { oneofKind: undefined };
        if (value !== undefined)
            reflectionMergePartial<Target>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Target): Target {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* orders.TargetPrice price */ 1:
                    message.targetType = {
                        oneofKind: "price",
                        price: TargetPrice.internalBinaryRead(reader, reader.uint32(), options, (message.targetType as any).price)
                    };
                    break;
                case /* orders.TargetProfit profit */ 2:
                    message.targetType = {
                        oneofKind: "profit",
                        profit: TargetProfit.internalBinaryRead(reader, reader.uint32(), options, (message.targetType as any).profit)
                    };
                    break;
                case /* orders.TargetMovingPerc moving_perc */ 3:
                    message.targetType = {
                        oneofKind: "movingPerc",
                        movingPerc: TargetMovingPerc.internalBinaryRead(reader, reader.uint32(), options, (message.targetType as any).movingPerc)
                    };
                    break;
                case /* orders.Market market */ 4:
                    message.targetType = {
                        oneofKind: "market",
                        market: Market.internalBinaryRead(reader, reader.uint32(), options, (message.targetType as any).market)
                    };
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Target, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* orders.TargetPrice price = 1; */
        if (message.targetType.oneofKind === "price")
            TargetPrice.internalBinaryWrite(message.targetType.price, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* orders.TargetProfit profit = 2; */
        if (message.targetType.oneofKind === "profit")
            TargetProfit.internalBinaryWrite(message.targetType.profit, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* orders.TargetMovingPerc moving_perc = 3; */
        if (message.targetType.oneofKind === "movingPerc")
            TargetMovingPerc.internalBinaryWrite(message.targetType.movingPerc, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* orders.Market market = 4; */
        if (message.targetType.oneofKind === "market")
            Market.internalBinaryWrite(message.targetType.market, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message orders.Target
 */
export const Target = new Target$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TargetPrice$Type extends MessageType<TargetPrice> {
    constructor() {
        super("orders.TargetPrice", [
            { no: 1, name: "price", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 2, name: "direction", kind: "enum", T: () => ["orders.Direction", Direction] }
        ]);
    }
    create(value?: PartialMessage<TargetPrice>): TargetPrice {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.price = 0;
        message.direction = 0;
        if (value !== undefined)
            reflectionMergePartial<TargetPrice>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TargetPrice): TargetPrice {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* float price */ 1:
                    message.price = reader.float();
                    break;
                case /* orders.Direction direction */ 2:
                    message.direction = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: TargetPrice, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* float price = 1; */
        if (message.price !== 0)
            writer.tag(1, WireType.Bit32).float(message.price);
        /* orders.Direction direction = 2; */
        if (message.direction !== 0)
            writer.tag(2, WireType.Varint).int32(message.direction);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message orders.TargetPrice
 */
export const TargetPrice = new TargetPrice$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TargetProfit$Type extends MessageType<TargetProfit> {
    constructor() {
        super("orders.TargetProfit", [
            { no: 1, name: "profit_perc", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 2, name: "direction", kind: "enum", T: () => ["orders.Direction", Direction] }
        ]);
    }
    create(value?: PartialMessage<TargetProfit>): TargetProfit {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.profitPerc = 0;
        message.direction = 0;
        if (value !== undefined)
            reflectionMergePartial<TargetProfit>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TargetProfit): TargetProfit {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* float profit_perc */ 1:
                    message.profitPerc = reader.float();
                    break;
                case /* orders.Direction direction */ 2:
                    message.direction = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: TargetProfit, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* float profit_perc = 1; */
        if (message.profitPerc !== 0)
            writer.tag(1, WireType.Bit32).float(message.profitPerc);
        /* orders.Direction direction = 2; */
        if (message.direction !== 0)
            writer.tag(2, WireType.Varint).int32(message.direction);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message orders.TargetProfit
 */
export const TargetProfit = new TargetProfit$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TargetMovingPerc$Type extends MessageType<TargetMovingPerc> {
    constructor() {
        super("orders.TargetMovingPerc", [
            { no: 1, name: "price_perc", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 2, name: "local_ath", kind: "scalar", opt: true, T: 2 /*ScalarType.FLOAT*/ },
            { no: 3, name: "direction", kind: "enum", T: () => ["orders.Direction", Direction] }
        ]);
    }
    create(value?: PartialMessage<TargetMovingPerc>): TargetMovingPerc {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.pricePerc = 0;
        message.direction = 0;
        if (value !== undefined)
            reflectionMergePartial<TargetMovingPerc>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TargetMovingPerc): TargetMovingPerc {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* float price_perc */ 1:
                    message.pricePerc = reader.float();
                    break;
                case /* optional float local_ath */ 2:
                    message.localAth = reader.float();
                    break;
                case /* orders.Direction direction */ 3:
                    message.direction = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: TargetMovingPerc, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* float price_perc = 1; */
        if (message.pricePerc !== 0)
            writer.tag(1, WireType.Bit32).float(message.pricePerc);
        /* optional float local_ath = 2; */
        if (message.localAth !== undefined)
            writer.tag(2, WireType.Bit32).float(message.localAth);
        /* orders.Direction direction = 3; */
        if (message.direction !== 0)
            writer.tag(3, WireType.Varint).int32(message.direction);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message orders.TargetMovingPerc
 */
export const TargetMovingPerc = new TargetMovingPerc$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Market$Type extends MessageType<Market> {
    constructor() {
        super("orders.Market", []);
    }
    create(value?: PartialMessage<Market>): Market {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<Market>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Market): Market {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Market, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message orders.Market
 */
export const Market = new Market$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Amount$Type extends MessageType<Amount> {
    constructor() {
        super("orders.Amount", [
            { no: 1, name: "perc_bps", kind: "scalar", oneof: "amountType", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "fixed", kind: "scalar", oneof: "amountType", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value?: PartialMessage<Amount>): Amount {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.amountType = { oneofKind: undefined };
        if (value !== undefined)
            reflectionMergePartial<Amount>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Amount): Amount {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 perc_bps */ 1:
                    message.amountType = {
                        oneofKind: "percBps",
                        percBps: reader.uint32()
                    };
                    break;
                case /* uint64 fixed */ 2:
                    message.amountType = {
                        oneofKind: "fixed",
                        fixed: reader.uint64().toBigInt()
                    };
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Amount, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 perc_bps = 1; */
        if (message.amountType.oneofKind === "percBps")
            writer.tag(1, WireType.Varint).uint32(message.amountType.percBps);
        /* uint64 fixed = 2; */
        if (message.amountType.oneofKind === "fixed")
            writer.tag(2, WireType.Varint).uint64(message.amountType.fixed);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message orders.Amount
 */
export const Amount = new Amount$Type();
