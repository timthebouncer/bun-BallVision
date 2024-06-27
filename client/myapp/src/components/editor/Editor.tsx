import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {Button} from "antd";

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

            const quill = new Quill(editorContainer, {
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block'],
                    ],
                },
                placeholder: 'Compose an epic...',
                theme: 'snow',
            });
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
        function formatDelta(delta) {
            return `<div>${JSON.stringify(delta.ops, null, 2)}</div>`;
        }
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
