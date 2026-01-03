import React from 'react';
import Chart from 'react-apexcharts';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import DroppableAssignmentFootnote from './DroppableAssignmentFootnote';
import messages from '../messages';

const CustomGradeSummaryTable = ({
  intl,
  assignmentPolicies,
  setAllOfSomeAssignmentTypeIsLocked,
  footnotes,
  getFootnoteId,
}) => {
  // Process actual assignment data for footnotes
  assignmentPolicies.forEach((assignment) => {
    if (assignment.numDroppable > 0) {
      const footnoteId = getFootnoteId(assignment);
      footnotes.push({
        id: footnoteId,
        numDroppable: assignment.numDroppable,
        assignmentType: assignment.type,
      });
    }
  });

  // Transform data for ApexCharts
  const chartSeries = [
    {
      name: intl.formatMessage(messages.weight),
      data: assignmentPolicies.map(assignment => (assignment.weight * 100).toFixed(0)),
    },
    {
      name: intl.formatMessage(messages.grade),
      data: assignmentPolicies.map(assignment => (assignment.averageGrade * 100).toFixed(0)),
    },
    {
      name: intl.formatMessage(messages.weightedGrade),
      data: assignmentPolicies.map(assignment => (assignment.weightedGrade * 100).toFixed(0)),
    },
  ];

  const chartCategories = assignmentPolicies.map(assignment => assignment.type);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: chartCategories,
      title: {
        text: intl.formatMessage(messages.assignmentType),
      },
    },
    yaxis: {
      title: {
        text: 'Percentage (%)',
      },
      labels: {
        formatter(val) {
          return `${val}%`;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter(val) {
          return `${val}%`;
        },
      },
    },
    legend: {
      position: 'top',
    },
    colors: ['#2B2399', '#00E396', '#FEB019'],
  };

  return (
    <>
      {/* ApexCharts Basic Column (Bar) Chart with Dynamic Data */}
      <div className="chart-container mb-4">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>

      {footnotes && (
        <DroppableAssignmentFootnote footnotes={footnotes} />
      )}
    </>
  );
};

CustomGradeSummaryTable.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CustomGradeSummaryTable);
