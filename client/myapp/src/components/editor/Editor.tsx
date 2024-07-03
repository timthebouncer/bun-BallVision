import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface EditorProps {
    readOnly?: boolean;
    defaultValue?: any;
    onTextChange?: any;
    onSelectionChange?: any;
}

// Editor is an uncontrolled React component
const Editor = forwardRef<Quill, EditorProps>(
    ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {

        const containerRef = useRef<HTMLDivElement>(null);
        const defaultValueRef = useRef(defaultValue);
        const onTextChangeRef = useRef(onTextChange);
        const onSelectionChangeRef = useRef(onSelectionChange);

        useLayoutEffect(() => {
            onTextChangeRef.current = onTextChange;
            onSelectionChangeRef.current = onSelectionChange;
        }, [onTextChange, onSelectionChange]);

        useEffect(() => {
            if (ref && 'current' in ref) {
                ref.current?.enable(!readOnly);
            }
        }, [ref, readOnly]);

        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;

            const editorContainer = container.appendChild(
                container.ownerDocument.createElement('div'),
            );

            const toolbarOptions = [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['image', 'link', 'video'],
                [{ list: "ordered" }, { list: "bullet" }],
                [{'color': []}],
                [{ 'align': [] }]
            ]


            const quill = new Quill(editorContainer, {
                modules: {
                    syntax: true,
                    toolbar: {
                        container: toolbarOptions,
                        // handlers: {
                        //     image: imageHandler
                        // },
                    },
                },
                placeholder: 'Compose an epic...',
                theme: 'snow',
            });

            // function imageHandler() {
            //     var range = quill.getSelection();
            //     var value = prompt('What is the image URL');
            //     if(value){
            //         quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
            //     }
            // }

            if (ref && 'current' in ref) {
                ref.current = quill;
            }

            if (defaultValueRef.current) {
                quill.setContents(defaultValueRef.current);
            }

            quill.on(Quill.events.TEXT_CHANGE, (...args) => {
                onTextChangeRef.current?.(...args);
            });

            quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
                onSelectionChangeRef.current?.(...args);
            });



            return () => {
                if (ref && 'current' in ref) {
                    ref.current = null;
                }

                container.innerHTML = '';
            };
        }, [ref]);


        // console.log(ref,'ref')
        // console.log(ref.current,'ref')
        // console.log(ref?.current?.getContents(),'getContents')
        // ref?.current.on(Quill.events.TEXT_CHANGE, update);

        // update();
        //

        //
        // function update(delta) {
        //     console.log(ref,'rrr')
        //     const contents = ref?.current.getContents();
        //     let html = `<h3>contents</h3>${formatDelta(contents)}`
        //     console.log(html,'html111')
        //     if (delta) {
        //         html = `${html}<h3>change</h3>${formatDelta(delta)}`;
        //         console.log(html,'html')
        //     }
        //
        // }

        return <div ref={containerRef}>
        </div>;
    },
);

Editor.displayName = 'Editor';

export { Editor };
