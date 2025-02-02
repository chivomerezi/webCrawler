import java.io.IOException;
//import java.util.HashSet;
//import java.util.Set;
//import java.util.StringTokenizer;
import org.apache.hadoop.io.IntWritable;
//import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
//import org.apache.hadoop.mapreduce.Reducer.Context;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.fs.Path;


public class WordCountGeneral {
	
	
	public class WCConstants {
		public static final int sitio = 0;
		public static final int tag = 1;
		public static final int palabra = 2;
		
	}
	
	public static class Map extends Mapper<Object, Text, Text, IntWritable>{
		
		
		
		
		public void map(Object key, Text value,
				Context context)
				throws IOException, InterruptedException {
				
			String[] parts = value.toString().split("[|]");
			//palabraN.set(parts[WCConstants.palabra]);
			if(parts.length==3 && !(parts[2].toString().isEmpty())) {
				Text palabraKey = new Text(parts[2].toString());
			
			
				context.write(palabraKey, new IntWritable(1));
			}
		}
	}
		
		public static class Reduce extends 
			Reducer<Text, IntWritable, Text, IntWritable>{
			
			public void reduce(Text palabra,
					Iterable<IntWritable> values,
					Context context)
					throws IOException, InterruptedException {
				
				int sum=0;
				for(IntWritable x: values) {
					sum+=x.get();
				}
				context.write(palabra, new IntWritable(sum));
				
			}
			
			
		}
			
	
			
		
	
	
	
	
	public static void main(String[] args) throws Exception{
		
		Configuration conf=new Configuration();
		
		Job job = Job.getInstance(conf, "MapReduceCrawler");
		
		job.setJarByClass(WordCountGeneral.class);
		
		job.setMapperClass(Map.class);
		job.setReducerClass(Reduce.class);
		
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(IntWritable.class);
		
		job.setInputFormatClass(TextInputFormat.class);
		job.setOutputFormatClass(TextOutputFormat.class);
		
		
		Path outputPath = new Path(args[1]);
		
		FileInputFormat.addInputPath(job, new Path(args[0]));
		FileOutputFormat.setOutputPath(job, new Path(args[1]));
		
		outputPath.getFileSystem(conf).delete(outputPath, true);
		
		System.exit(job.waitForCompletion(true) ? 0 : 1);
		
	
	}
	
}









