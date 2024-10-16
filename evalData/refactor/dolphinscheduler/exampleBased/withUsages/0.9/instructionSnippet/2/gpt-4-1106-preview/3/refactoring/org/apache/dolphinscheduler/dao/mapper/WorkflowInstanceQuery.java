package org.apache.dolphinscheduler.dao.mapper;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.dolphinscheduler.dao.entity.WorkflowInstance;

public class WorkflowInstanceQuery {
    private Page<WorkflowInstance> page;
    private Long projectCode;
    private Long workflowDefinitionCode;
    private String name;
    private String host;
    private Date startTime;
    private Date endTime;

    // getters and setters
}