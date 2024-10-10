 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.apache.rocketmq.common.stats;

public class Stats {

    private static final String QUEUE_PUT_NUMS = "QUEUE_PUT_NUMS";
    private static final String QUEUE_PUT_SIZE = "QUEUE_PUT_SIZE";
    private static final String QUEUE_GET_NUMS = "QUEUE_GET_NUMS";
    private static final String QUEUE_GET_SIZE = "QUEUE_GET_SIZE";
    private static final String TOPIC_PUT_NUMS = "TOPIC_PUT_NUMS";
    private static final String TOPIC_PUT_SIZE = "TOPIC_PUT_SIZE";
    private static final String GROUP_GET_NUMS = "GROUP_GET_NUMS";
    private static final String GROUP_GET_SIZE = "GROUP_GET_SIZE";
    private static final String SNDBCK_PUT_NUMS = "SNDBCK_PUT_NUMS";
    private static final String BROKER_PUT_NUMS = "BROKER_PUT_NUMS";
    private static final String BROKER_GET_NUMS = "BROKER_GET_NUMS";
    private static final String GROUP_GET_FROM_DISK_NUMS = "GROUP_GET_FROM_DISK_NUMS";
    private static final String GROUP_GET_FROM_DISK_SIZE = "GROUP_GET_FROM_DISK_SIZE";
    private static final String BROKER_GET_FROM_DISK_NUMS = "BROKER_GET_FROM_DISK_NUMS";
    private static final String BROKER_GET_FROM_DISK_SIZE = "BROKER_GET_FROM_DISK_SIZE";
    private static final String COMMERCIAL_SEND_TIMES = "COMMERCIAL_SEND_TIMES";
    private static final String COMMERCIAL_SNDBCK_TIMES = "COMMERCIAL_SNDBCK_TIMES";
    private static final String COMMERCIAL_RCV_TIMES = "COMMERCIAL_RCV_TIMES";
    private static final String COMMERCIAL_RCV_EPOLLS = "COMMERCIAL_RCV_EPOLLS";
    private static final String COMMERCIAL_SEND_SIZE = "COMMERCIAL_SEND_SIZE";
    private static final String COMMERCIAL_RCV_SIZE = "COMMERCIAL_RCV_SIZE";
    private static final String COMMERCIAL_PERM_FAILURES = "COMMERCIAL_PERM_FAILURES";

    private static final String GROUP_GET_FALL_SIZE = "GROUP_GET_FALL_SIZE";
    private static final String GROUP_GET_FALL_TIME = "GROUP_GET_FALL_TIME";
    private static final String GROUP_GET_LATENCY = "GROUP_GET_LATENCY";
}