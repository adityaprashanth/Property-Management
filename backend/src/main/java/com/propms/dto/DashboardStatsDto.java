package com.propms.dto;

public class DashboardStatsDto {

    private Long totalCustomers;

    private Double totalPayments;

    private Long projectsRunning;

    public DashboardStatsDto() {
    }

    public DashboardStatsDto(
            Long totalCustomers,
            Double totalPayments,
            Long projectsRunning
    ) {
        this.totalCustomers = totalCustomers;
        this.totalPayments = totalPayments;
        this.projectsRunning = projectsRunning;
    }

    public Long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(
            Long totalCustomers
    ) {
        this.totalCustomers = totalCustomers;
    }

    public Double getTotalPayments() {
        return totalPayments;
    }

    public void setTotalPayments(
            Double totalPayments
    ) {
        this.totalPayments = totalPayments;
    }

    public Long getProjectsRunning() {
        return projectsRunning;
    }

    public void setProjectsRunning(
            Long projectsRunning
    ) {
        this.projectsRunning = projectsRunning;
    }
}
