package org.apache.dolphinscheduler.dao.mapper;

import org.apache.dolphinscheduler.dao.model.WorkflowInstance;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import java.util.Date;

public class WorkflowInstanceQueryParameters {
    private final Page<WorkflowInstance> page;
    private final Long projectCode;
    // Other fields

    public WorkflowInstanceQueryParameters(Page<WorkflowInstance> page, Long projectCode) {
        this.page = page;
        this.projectCode = projectCode;
        // Initialize other fields
    }

    // Getters and potential additional logic related to these parameters
}