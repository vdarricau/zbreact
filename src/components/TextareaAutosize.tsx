import { Textarea, TextareaProps } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

// Updates the height of a <textarea> when the value changes.
const TextareaAutosize = (props: TextareaProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(() => {
        if (textAreaRef && textAreaRef.current) {
            const current = textAreaRef.current;
            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            current.style.height = "0px";
            const scrollHeight = current.scrollHeight;
            
            // We then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.
            current.style.height = scrollHeight + "px";
        }
    }, [textAreaRef, props.value]);
    
    
    return (
        <Textarea
            style={{overflow: "hidden"}}
            ref={textAreaRef}
            rows={1}
            {...props} />
    )
};

export default TextareaAutosize;