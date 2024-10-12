import type { CSSObject, Interpolation } from "@emotion/react"
import type { Merge } from "@yamada-ui/utils"
import type * as React from "react"
import type { CSSUIObject, CSSUIProps } from "../css"
import type { StyleProps } from "../styles"
import type { PropsTheme } from "../theme.types"
import type { DOMElements } from "./element.types"

export type BaseStyle =
  | CSSUIObject
  | ((props: StyledResolverProps) => CSSUIObject)

export type StyledOptions = {
  disableStyleProp?: (prop: string) => boolean
  shouldForwardProp?: (prop: string) => boolean
  label?: string
  baseStyle?: BaseStyle
}

export type UIFactory = {
  <T extends As, P extends object = {}>(
    component: T,
    options?: StyledOptions,
  ): UIComponent<T, P>
}

export type StyledResolverProps = CSSUIObject & {
  theme: PropsTheme
  /**
   * Used for internal css management.
   *
   * @private
   */
  __css?: CSSUIObject
  /**
   * The CSS object that depends on the theme.
   */
  sx?: CSSUIObject
  /**
   * The emotion's css object.
   */
  css?: CSSObject
}

export type UIProps = CSSUIProps & {
  /**
   * Used for internal css management.
   *
   * @private
   */
  __css?: CSSUIObject
  /**
   * The CSS object that depends on the theme.
   */
  sx?: CSSUIObject
  /**
   * The emotion's css object.
   */
  css?: Interpolation<{}>
}

export type OmitProps<Y, M extends keyof any = never> = Omit<Y, "as" | M>

export type IntersectionProps<
  Y extends object = {},
  M extends object = {},
> = OmitProps<Y, keyof M> & M

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As
}

export type ComponentProps<
  Y extends object,
  M extends object,
  D extends object = {},
  H extends As = As,
> = (IntersectionProps<Y, D> | IntersectionProps<M, D>) & {
  as?: H
}

export type ComponentArgs = {
  displayName?: string
  propTypes?: React.WeakValidationMap<any>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<any>
  id?: string
  __ui__?: string
}

export type Component<Y extends As, M extends object = {}> = {
  <D extends As = Y>(
    props: ComponentProps<
      React.ComponentProps<Y>,
      React.ComponentProps<D>,
      M,
      D
    >,
  ): JSX.Element
} & ComponentArgs

export type As = React.ElementType

export type HTMLUIComponents = {
  [Y in DOMElements]: UIComponent<Y, {}>
}

type Assign<T, U> = Omit<T, keyof U> & U

export type UIComponent<Y extends As, M extends object = {}> = Component<
  Y,
  Assign<UIProps, M>
>

export type HTMLUIProps<Y extends As> = Omit<
  PropsOf<Y>,
  Y extends "svg"
    ? "ref" | "children" | keyof StyleProps
    : "ref" | keyof StyleProps
> &
  UIProps & { as?: As }

export type UIPropGetter<Y extends As = "div", M = undefined, D = undefined> = (
  props?: Merge<HTMLUIProps<Y>, M>,
  ref?: React.Ref<any>,
) => Merge<HTMLUIProps<Y> & React.RefAttributes<any>, D>

export type RequiredUIPropGetter<
  Y extends As = "div",
  M = undefined,
  D = undefined,
> = (
  props: Merge<HTMLUIProps<Y>, M>,
  ref?: React.Ref<any>,
) => Merge<HTMLUIProps<Y> & React.RefAttributes<any>, D>
