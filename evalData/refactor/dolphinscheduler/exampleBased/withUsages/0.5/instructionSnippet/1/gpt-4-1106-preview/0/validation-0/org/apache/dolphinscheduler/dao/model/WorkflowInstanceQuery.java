package org.apache.dolphinscheduler.dao.model;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.dolphinscheduler.dao.entity.WorkflowInstance;

public class WorkflowInstanceQuery {

    private Page<WorkflowInstance> page;
    private Long workflowDefinitionCode;
    private String name;
    private String host;

    // Constructor, getters, and setters...
}