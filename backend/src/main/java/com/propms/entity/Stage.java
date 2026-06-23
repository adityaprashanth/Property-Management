package com.propms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "stage")
public class Stage {

    @Id
    @Column(name = "stage_id")
    private Integer stageId;

    @Column(name = "stage_name")
    private String stageName;

    public Integer getStageId() {
        return stageId;
    }

    public void setStageId(Integer stageId) {
        this.stageId = stageId;
    }

    public String getStageName() {
        return stageName;
    }

    public void setStageName(String stageName) {
        this.stageName = stageName;
    }
}
