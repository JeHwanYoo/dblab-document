/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FileSystemCreateFormInputValues = {
    name?: string;
    isDirectory?: boolean;
};
export declare type FileSystemCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    isDirectory?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FileSystemCreateFormOverridesProps = {
    FileSystemCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    isDirectory?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type FileSystemCreateFormProps = React.PropsWithChildren<{
    overrides?: FileSystemCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FileSystemCreateFormInputValues) => FileSystemCreateFormInputValues;
    onSuccess?: (fields: FileSystemCreateFormInputValues) => void;
    onError?: (fields: FileSystemCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FileSystemCreateFormInputValues) => FileSystemCreateFormInputValues;
    onValidate?: FileSystemCreateFormValidationValues;
} & React.CSSProperties>;
export default function FileSystemCreateForm(props: FileSystemCreateFormProps): React.ReactElement;
