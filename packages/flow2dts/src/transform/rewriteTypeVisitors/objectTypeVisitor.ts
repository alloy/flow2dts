import { Visitor, types as t } from "@babel/core"
import { State } from "../state"
import { assertTSType, assertTSTypeElement, nameForTypeIndexerKey } from "../utilities"

export const objectTypeVisitor: Visitor<State> = {
  ObjectTypeIndexer: {
    exit(path) {
      const { id, key, value, variance } = path.node
      assertTSType(key)
      assertTSType(value)

      const readonly = variance && variance.kind === "plus"
      const writeonly = variance && variance.kind === "minus"

      if (writeonly) {
        path.addComment(
          "leading",
          "[FLOW2DTS - Warning] This property was a write-only property in the original Flow source."
        )
      }

      const identifier = t.identifier(id === null ? nameForTypeIndexerKey : id.name)
      identifier.typeAnnotation = t.tsTypeAnnotation(key)

      const indexSignature = t.tsIndexSignature([identifier], t.tsTypeAnnotation(value))
      indexSignature.readonly = readonly

      path.replaceWith(indexSignature)
    },
  },
  ObjectTypeProperty: {
    exit(path) {
      const { key, kind, variance, optional } = path.node
      let value = path.node.value as any
      assertTSType(value)

      if (
        t.isTSFunctionType(value) &&
        path.parentPath.isObjectTypeAnnotation() &&
        path.parentPath.parentPath.isDeclareClass()
      ) {
        const isConstructor = (t.isIdentifier(key) ? key.name : key.value) === "constructor"
        path.replaceWith(
          t.tsMethodSignature(
            key,
            value.typeParameters,
            value.parameters,
            isConstructor ? undefined : value.typeAnnotation
          )
        )
      } else {
        const readonly = variance && variance.kind === "plus"
        const writeonly = variance && variance.kind === "minus"

        if (writeonly) {
          path.addComment(
            "leading",
            "[FLOW2DTS - Warning] This property was a write-only property in the original Flow source."
          )
        }

        // TODO: Mark as readonly if no `set` version exists
        if (kind === "get") {
          t.assertTSFunctionType(value)
          value = value.typeAnnotation!.typeAnnotation
        }

        const propertySignature = t.tsPropertySignature(
          key.type === "Identifier" ? t.identifier(key.name) : t.stringLiteral(key.value),
          t.tsTypeAnnotation(value)
        )
        propertySignature.readonly = readonly
        propertySignature.optional = optional

        path.replaceWith(propertySignature)
      }
    },
  },
  ObjectTypeCallProperty: {
    exit(path) {
      const { value } = path.node
      assertTSType(value)

      const callSignature = t.tsCallSignatureDeclaration(
        (<t.TSFunctionType>value).typeParameters,
        (<t.TSFunctionType>value).parameters,
        (<t.TSFunctionType>value).typeAnnotation
      )

      path.replaceWith(callSignature)
    },
  },
  ObjectTypeAnnotation: {
    exit(path, state) {
      const { exact, properties, callProperties, indexers } = path.node // TODO: callProperties, inexact

      if (exact) {
        path.addComment(
          "leading",
          "[FLOW2DTS - Warning] This type was an exact object type in the original Flow source."
        )
      }

      // {x: number, ...T, y: number} to T & {x: number} & {y: number}
      const elements: Array<t.TSTypeElement | t.TSMethodSignature> = []
      const spreads: t.TSType[] = []

      for (const prop of properties) {
        if (t.isObjectTypeSpreadProperty(prop)) {
          const { argument } = prop
          assertTSType(argument)
          spreads.push(argument)
        } else if (t.isTSTypeElement(prop) || t.isTSMethodSignature(prop)) {
          elements.push(prop)
        } else {
          throw new Error("Unexpected property type")
        }
      }

      for (const prop of callProperties!) {
        assertTSTypeElement(prop)
        elements.push(prop)
      }

      for (const prop of indexers!) {
        assertTSTypeElement(prop)
        elements.push(prop)
      }

      const typeLiteral = t.tsTypeLiteral(elements)
      if (spreads.length > 0) {
        path.replaceWith(t.tsIntersectionType([...spreads, typeLiteral]))
      } else {
        const typeLiteral = t.tsTypeLiteral(elements)
        path.replaceWith(typeLiteral)
      }
    },
  },
}
