/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FileSystem } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FileSystemUpdateFormInputValues = {
    name?: string;
    isDirectory?: boolean;
};
export declare type FileSystemUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    isDirectory?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FileSystemUpdateFormOverridesProps = {
    FileSystemUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    isDirectory?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type FileSystemUpdateFormProps = React.PropsWithChildren<{
    overrides?: FileSystemUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    fileSystem?: FileSystem;
    onSubmit?: (fields: FileSystemUpdateFormInputValues) => FileSystemUpdateFormInputValues;
    onSuccess?: (fields: FileSystemUpdateFormInputValues) => void;
    onError?: (fields: FileSystemUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FileSystemUpdateFormInputValues) => FileSystemUpdateFormInputValues;
    onValidate?: FileSystemUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FileSystemUpdateForm(props: FileSystemUpdateFormProps): React.ReactElement;
