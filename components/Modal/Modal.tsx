// import { cn } from "@/utils/functions";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "../../util";

/* -------------------------------------------------------------------------------------------------
 * Trigger
 * -----------------------------------------------------------------------------------------------*/

type TriggerElement = ElementRef<typeof Dialog.Trigger>;
type TriggerProps = ComponentPropsWithoutRef<typeof Dialog.Trigger>;

const Trigger = forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  const { asChild = true, ...triggerProps } = props;
  return <Dialog.Trigger asChild={asChild} {...triggerProps} ref={ref} />;
});

Trigger.displayName = "ModalTrigger";

/* -------------------------------------------------------------------------------------------------
 * Content
 * -----------------------------------------------------------------------------------------------*/

type ContentElement = ElementRef<typeof Dialog.Content>;
type ContentProps = ComponentPropsWithoutRef<typeof Dialog.Content> & {
  overlayClassname?: string;
};

const Content = forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { overlayClassname, className, ...contentProps } = props;
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className={cn(
          "fixed overlay inset-0 z-[9999] bg-black/40",
          overlayClassname
        )}
      />
      <Dialog.Content
        className={cn(
          " min-w-[95%] !border-2 !border-black !rounded-lg max-h-[95vh] max-md:max-w-[80%] modal-content md:min-w-[80%] overflow-auto scroll-container z-[99999] flex items-start justify-start flex-col outline-none !fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          className
        )}
        {...contentProps}
        ref={ref}
      />
    </Dialog.Portal>
  );
});

Content.displayName = "ModalContent";

const Modal = {
  Root: Dialog.Root,
  Trigger,
  Content,
  Title: Dialog.Title,
  Description: Dialog.Description,
  Close: Dialog.Close,
};

export default Modal;
