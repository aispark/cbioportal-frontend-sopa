import * as React from 'react';
import 'rc-tooltip/assets/bootstrap_white.css';
import { Mutation, RemoteData } from 'cbioportal-utils';
import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import {
    getSignalData,
    Signal,
    signalDownload,
    signalSortValue,
} from 'react-mutation-mapper';

export default class SignalColumnFormatter {
    public static renderFunction(
        mutation: Mutation[],
        indexedVariantAnnotations?: RemoteData<
            { [genomicLocation: string]: VariantAnnotation } | undefined
        >
    ) {
        return (
            <Signal
                mutation={mutation[0]}
                indexedVariantAnnotations={indexedVariantAnnotations}
            />
        );
    }

    public static download(
        mutation: Mutation[],
        indexedVariantAnnotations?: RemoteData<
            { [genomicLocation: string]: VariantAnnotation } | undefined
        >
    ): string {
        return signalDownload(
            getSignalData(mutation[0], indexedVariantAnnotations)
        );
    }

    public static getSortValue(
        mutation: Mutation[],
        indexedVariantAnnotations?: RemoteData<
            { [genomicLocation: string]: VariantAnnotation } | undefined
        >
    ): number | null {
        return signalSortValue(
            getSignalData(mutation[0], indexedVariantAnnotations)
        );
    }
}
