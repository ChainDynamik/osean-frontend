import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cn } from "../../util";

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerElement = ElementRef<typeof DropdownMenu.Trigger>;
type TriggerProps = ComponentPropsWithoutRef<typeof DropdownMenu.Trigger>;

const Trigger = forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  const { asChild = true, className, ...triggerProps } = props;

  return (
    <DropdownMenu.Trigger
      className={cn("w-fit cursor-pointer", className)}
      asChild={asChild}
      {...triggerProps}
      ref={ref}
    />
  );
});

Trigger.displayName = "DropdownTrigger";

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

type ContentElement = ElementRef<typeof DropdownMenu.Content>;
type ContentProps = ComponentPropsWithoutRef<typeof DropdownMenu.Content> & {
  overlayClassname?: string;
};

const Content = forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { overlayClassname, children, className, ...contentProps } = props;
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        sideOffset={6}
        side="bottom"
        className="outline-none max-h-[300px] lg:max-h-[600px] overflow-y-scroll rounded-lg shadow-2xl z-[99999999]  shadow-black/10 cursor-pointer border border-border"
        {...contentProps}
        ref={ref}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
});

Content.displayName = "DropdownContent";

/* -------------------------------------------------------------------------------------------------
 * Item
 * -----------------------------------------------------------------------------------------------*/

type ItemElelment = ElementRef<typeof DropdownMenu.Item>;
type ItemProps = ComponentPropsWithoutRef<typeof DropdownMenu.Item>;

const Item = forwardRef<ItemElelment, ItemProps>((props, ref) => {
  return (
    <DropdownMenu.Item
      className="px-3 !py-2.5 !outline-none bg-white hover:!bg-gray-200 min-w-[100px] border-b-[1px] flex gap-3"
      ref={ref}
      {...props}
    />
  );
});

Item.displayName = "DropdownItem";

/* -------------------------------------------------------------------------------------------------
 * SubTrigger
 * -----------------------------------------------------------------------------------------------*/

type SubTriggerElement = ElementRef<typeof DropdownMenu.SubTrigger>;
type SubTriggerProps = ComponentPropsWithoutRef<typeof DropdownMenu.SubTrigger>;

const SubTrigger = forwardRef<SubTriggerElement, SubTriggerProps>(
  (props, ref) => {
    const { asChild = true, ...subTriggerProps } = props;
    return (
      <DropdownMenu.SubTrigger
        asChild={asChild}
        ref={ref}
        {...subTriggerProps}
      />
    );
  }
);

SubTrigger.displayName = "DropdownSubTrigger";

/* -------------------------------------------------------------------------------------------------
 * SubContent
 * -----------------------------------------------------------------------------------------------*/
type SubContentElement = ElementRef<typeof DropdownMenu.SubContent>;
type SubContentProps = ComponentPropsWithoutRef<typeof DropdownMenu.SubContent>;

const SubContent = forwardRef<SubContentElement, SubContentProps>(
  (props, ref) => {
    return <DropdownMenu.SubContent ref={ref} {...props} />;
  }
);

SubContent.displayName = "DropdownSubContent";

export const Dropdown = {
  Root: DropdownMenu.Root,
  Group: DropdownMenu.Group,
  Label: DropdownMenu.Label,
  CheckboxItem: DropdownMenu.CheckboxItem,
  RadioGroup: DropdownMenu.RadioGroup,
  RadioItem: DropdownMenu.RadioItem,
  ItemIndicator: DropdownMenu.ItemIndicator,
  Separator: DropdownMenu.Separator,
  Sub: DropdownMenu.Sub,
  Arrow: DropdownMenu.Arrow,
  Trigger,
  Content,
  Item,
  SubContent,
  SubTrigger,
};
