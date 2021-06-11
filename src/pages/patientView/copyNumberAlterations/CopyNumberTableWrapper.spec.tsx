import React from 'react';
import Enzyme, { ReactWrapper, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { assert } from 'chai';
import { default as CopyNumberTableWrapper } from './CopyNumberTableWrapper';
import { GeneFilterOption } from '../mutation/GeneFilterMenu';
import { USE_DEFAULT_PUBLIC_INSTANCE_FOR_ONCOKB } from 'react-mutation-mapper';

Enzyme.configure({ adapter: new Adapter() });

function hasColumn(
    tableWrapper: ReactWrapper<any, any>,
    columnName: string
): boolean {
    const columns: string[] = [];
    tableWrapper.find('th span').map((span: ReactWrapper<any, any>) => {
        columns.push(span.text());
    });
    return columns.indexOf(columnName) > -1;
}

function getTable(
    samples: string[],
    mrnaMolecularProfileId?: string
): ReactWrapper<any, any> {
    return mount(
        <CopyNumberTableWrapper
            sampleManager={null}
            sampleToGenePanelId={{}}
            genePanelIdToEntrezGeneIds={{}}
            sampleIds={samples}
            gisticData={{}}
            usingPublicOncoKbInstance={USE_DEFAULT_PUBLIC_INSTANCE_FOR_ONCOKB}
            status="available"
            referenceGenes={[]}
            currentGeneFilter={GeneFilterOption.ANY_SAMPLE}
            data={[]}
            mrnaExprRankMolecularProfileId={mrnaMolecularProfileId}
        />
    );
}

describe('CopyNumberTableWrapper', () => {
    it('shows mrna expr column if theres one sample and a molecular profile id', () => {
        assert(
            hasColumn(getTable(['sampleA'], 'id'), 'mRNA Expr.'),
            'Has with one sample and id'
        );
        assert(
            !hasColumn(getTable(['sampleA']), 'mRNA Expr.'),
            'Doesnt have with one sample and no id'
        );
        assert(
            !hasColumn(getTable([], 'id'), 'mRNA Expr.'),
            "Doesn't have with 0 samples and id"
        );
        assert(
            !hasColumn(getTable(['sampleA', 'sampleB'], 'id'), 'mRNA Expr.'),
            "Doesn't have with 2 samples and id"
        );
    });

    it('shows samples column if theres more than one sample', () => {
        assert(
            !hasColumn(getTable(['sampleA']), 'Samples'),
            'Doesnt have with one sample'
        );
        assert(
            !hasColumn(getTable(['sampleA']), 'Samples'),
            'Doesnt have with zero samples'
        );
        assert(
            hasColumn(getTable(['sampleA', 'sampleB']), 'Samples'),
            'Has with two samples'
        );
    });

    it('should have Samples column resizable', () => {
        const aTable = getTable(['sampleA', 'sampleB']);
        const res = aTable.find('.columnResizer');
        assert.equal(res.length, 2);
    });
});